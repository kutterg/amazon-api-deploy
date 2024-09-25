
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // console.log(paymentIntent);// or
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });

    //     console.log("payment recieved", total);
    //    res.send(total);
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

app.listen(5001, (err)=>{
    if(err) throw err
    console.log("Amazon Server Running on PORT: 5000, http://localhost:5001");//listen by itself not through firebase
    
})

// exports.api = onRequest(app);



//npm project
//1.npm init -y(for all)
//2.npm i express cors stripe dotenv
//3.npm start
