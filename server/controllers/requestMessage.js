const { Request } = require("../model/requestMessage");

// 1. Fetch request status
exports.getRequestStatus = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    // await Request.deleteMany();

    // Find request from sender to receiver
    const request = await Request.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    // Find request from receiver to sender (reverse)
    const reverseRequest = await Request.findOne({
      sender: receiverId,
      receiver: senderId,
    });

    console.log(request, reverseRequest);

    if (
      request?.status === "accepted" ||
      reverseRequest?.status === "accepted"
    ) {
      return res.status(200).json({ status: "accepted", request });
    }

    if (request) {
      return res.status(200).json({ status: request.status, request });
    }

    if (reverseRequest && reverseRequest.status === "awaiting_response") {
      return res.status(200).json({ status: "awaiting_response" });
    }

    return res.status(200).json({ status: "no_request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Send a request (create a new request)
exports.sendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if a request already exists
    const existingRequest = await Request.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists." });
    }

    // this is for sender side pending
    const newRequest_1 = new Request({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    // this is for reciever side awaiting response
    const newRequest_2 = new Request({
      sender: receiverId,
      receiver: senderId,
      status: "awaiting_response", // Initial status when request is sent
    });

    await newRequest_1.save();
    await newRequest_2.save();
    return res.status(200).json({ message: "Request sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Accept or Reject a request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    // Validate action
    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action." });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Update status based on action
    request.status = action === "accept" ? "accepted" : "rejected";
    await request.save();
    console.log({ request });

    return res
      .status(200)
      .json({ message: `Request ${action}ed successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// // /* {
//   _id: new ObjectId('679df2521303084585dd276c'),
//   sender: new ObjectId('6782263465f284776f2d31f9'),
//   receiver: new ObjectId('6780a597320fbe815c8cb00c'),
//   status: 'pending',
//   createdAt: 2025-02-01T10:07:14.945Z,
//   __v: 0
// }*/

// _id: new ObjectId('679df2521303084585dd276d'),
// sender: new ObjectId('6780a597320fbe815c8cb00c'),
// receiver: new ObjectId('6782263465f284776f2d31f9'),
// status: 'accepted',
// createdAt: 2025-02-01T10:07:14.946Z,
// __v: 0
// }
