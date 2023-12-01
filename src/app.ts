import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import emailRoute from './routes/emailRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/emails', emailRoute);

sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
