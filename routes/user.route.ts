import { Router } from 'express';
import { createUser, loginUser, getUserInfo, deleteUser, updateProperties, getUsers} from '../Controllers/user.controller';
import { authMiddleware } from '../Middleware/AuthMiddleware';


const router = Router();


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               charge:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the newly created user
 *       400:
 *         description: Bad request
 */

router.post('/register', createUser);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *           
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *               
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                  
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   
 */


router.post('/deleteUser', deleteUser as any);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     description: Logs in a user by verifying their email and password, and returns the user's ID if authentication is successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                
 *     responses:
 *       200:
 *         description: User successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the authenticated user.
 *                  
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   
 */


router.post('/login', loginUser as any);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get user information
 *     description: Retrieves user information by the user's ID, excluding the password field.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user's ID.
 *                  
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of when the user was created.
 *                   
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                  
 */


router.get('/me', authMiddleware as any, getUserInfo as any);

/**
 * @swagger
 * /updateProperties:
 *   put:
 *     summary: Update user properties
 *     description: Update specific properties of a user by their ID. You can send any property in the request body, and only those will be updated.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 
 *               email:
 *                 type: string
 *                 
 *               password:
 *                 type: string
 *                
 *               role:
 *                 type: string
 *                 example: admin
 *               isActive:
 *                 type: boolean
 *                 example: true
 *             description: Properties of the user to update. You can send one or multiple fields.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   
 *                 name:
 *                   type: string
 *                   
 *                 email:
 *                   type: string
 *                   
 *                 role:
 *                   type: string
 *                   example: admin
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error, something went wrong while updating the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */

router.patch('/updateProperties', updateProperties)

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Get users with pagination and charge filter
 *     description: Retrieve a paginated list of users filtered by their charge. You can specify the page, limit, and charge in the query parameters.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of users per page.
 *       - in: query
 *         name: charge
 *         schema:
 *           type: string
 *           example: manager
 *         description: Filter users by their charge (role or position).
 *     responses:
 *       200:
 *         description: A list of users filtered by charge and paginated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         
 *                       name:
 *                         type: string
 *                         
 *                       email:
 *                         type: string
 *                         
 *                       charge:
 *                         type: string
 *                        
 *                       isActive:
 *                         type: boolean
 *                         
 *       500:
 *         description: Server error, something went wrong while retrieving the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: Server error
 */

router.get('/getUsers', getUsers as any)

export default router;