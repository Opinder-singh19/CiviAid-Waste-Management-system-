const { getDB } =
require("../config/db");
const {
  ObjectId
}
=
require("mongodb");
exports.verifyDisposal =
async (req, res) => {

  try {

    const db = getDB();

    if (!req.session.user) {

      return res.status(401)
      .json({
        message:
        "Login required"
      });

    }

    const {

      dustbinName,
      distance

    } = req.body;

    const image =
    req.file?.filename;

    if (!image) {

      return res.json({

        message:
        "Image required"

      });

    }

    const reward =

    Math.floor(
      Math.random() * 6
    ) + 5;

    const userId =
    req.session.user.id;


    await db
    .collection("userActivities")
    .insertOne({

      userId,

      dustbinName,

      distance,

      image,

      coins: reward,

      createdAt:
      new Date()

    });


    await db
    .collection("users")
    .updateOne(

      {
        _id:
new ObjectId(userId)
      },

      {
        $inc: {
          coins: reward
        }
      }

    );

    res.json({

      message:
      "Waste verified",

      reward

    });

  }

  catch(err){

    console.log(err);

    res.status(500).json({

      message:
      "Server error"

    });

  }

};