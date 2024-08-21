const expres = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const { use } = require("./routes/testRoutes");
const { connectDB } = require("./config/db");

// Dotenv configuration
dotenv.config({ path: './config/.env' })

//mongoDB Connection
connectDB();

//res object
const app = expres();

//Middleware
app.use(cors());
app.use(expres.json());
app.use(morgan("dev"));

// route
app.use('/api/v1/test', require('./routes/testRoutes'));                // Test route
app.use('/api/v1/auth', require('./routes/authRoutes'));                // Auth route
app.use('/api/v1/user', require('./routes/userRoutes'));                // User route
app.use('/api/v1/restaurent', require('./routes/restaurentRoutes'));    // Restaurent route
app.use('/api/v1/category', require('./routes/categoryRoutes'));        // Category route
app.use('/api/v1/food', require('./routes/foodRoutes'));                // Food route
app.use('/api/v1/order', require('./routes/orderRoutes'));              // Order route


app.get('/', (req, res) => {
    return res.status(200).send("<h1> Welcome to Food Server API Server Project </h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(`Server is Listening ${PORT}`);
});