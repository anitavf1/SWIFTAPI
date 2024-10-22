import { Router } from 'express';
import { getSongs, getSongById, createSong, deleteSong, updateSong, updateProperties, deleteAll, createMultipleSongs } from '../Controllers/song.controller';
import { authMiddleware } from '../Middleware/AuthMiddleware';


const router = Router();


/**
 * @swagger
 * /createSong:
 *   post:
 *     summary: Create a new song
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               album:
 *                 type: string
 *               composer:
 *                 type: string
 *               lyricist:
 *                 type: string
 *               producer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Song created with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la nueva canción creada
 *                 name:
 *                   type: string
 *                   description: Nombre de la canción
 *                 album:
 *                   type: string
 *                   description: Álbum de la canción
 *                 composer:
 *                   type: string
 *                   description: Compositor de la canción
 *                 lyricist:
 *                   type: string
 *                   description: Letrista de la canción
 *                 producer:
 *                   type: string
 *                   description: Productor de la canción
 *       400:
 *         description: Incorrect Request
 */

router.post('/createSong', createSong);

/**
 * @swagger
 * /deleteSong:
 *   delete:
 *     summary: Delete a song by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la canción a eliminar
 *     responses:
 *       200:
 *         description: Song deleted with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando la canción no se encuentra
 *                   
 *       500:
 *         description: An error occurred while deleting the song. Try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error ocurrido
 *                  
 */

router.delete('/deleteSong/:id', deleteSong);

/**
 * @swagger
 * /updateSong:
 *   put:
 *     summary: Update an existing song by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la canción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la canción
 *               album:
 *                 type: string
 *                 description: Álbum de la canción
 *               composer:
 *                 type: string
 *                 description: Compositor de la canción
 *               lyricist:
 *                 type: string
 *                 description: Letrista de la canción
 *               producer:
 *                 type: string
 *                 description: Productor de la canción
 *     responses:
 *       200:
 *         description: Song updated with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la canción
 *                 name:
 *                   type: string
 *                   description: Nombre de la canción
 *                 album:
 *                   type: string
 *                   description: Álbum de la canción
 *                 composer:
 *                   type: string
 *                   description: Compositor de la canción
 *                 lyricist:
 *                   type: string
 *                   description: Letrista de la canción
 *                 producer:
 *                   type: string
 *                   description: Productor de la canción
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando la canción no se encuentra
 *                   
 *       500:
 *         description: An error occurred while updating the song
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 *                  
 */

router.put('/update/:id', updateSong);

/**
 * @swagger
 * /getSongById/:id:
 *   get:
 *     summary: Get song details
 *     description: Retrieves the details of a song by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the song to retrieve.
 *         schema:
 *           type: string
 *          
 *     responses:
 *       200:
 *         description: Successfully retrieved song details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the song.
 *                   
 *                 name:
 *                   type: string
 *                   description: The name of the song.
 *                 
 *                 album:
 *                   type: string
 *                   description: The album the song belongs to.
 *                   
 *                 composer:
 *                   type: string
 *                   description: The composer of the song.
 *                   
 *                 lyricist:
 *                   type: string
 *                   description: The lyricist of the song.
 *                   
 *                 producer:
 *                   type: string
 *                   description: The producer of the song.
 *                   
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the song record.
 *                   
 *       404:
 *         description: Song not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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


router.get('/getSongById/:id', getSongById as any);
router.get('/all', getSongs as any);

/**
 * @swagger
 * '/updateProperties/:id':
 *   put:
 *     summary: Update song properties
 *     description: Update specific properties of a song by its ID. You can send any property in the request body, and only those will be updated.
 *     tags:
 *       - Songs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the song to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Willow
 *               artist:
 *                 type: string
 *                 example: Taylor Swift
 *               album:
 *                 type: string
 *                 example: Evermore
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2020-12-11
 *               duration:
 *                 type: string
 *                 example: "03:34"
 *             description: Properties of the song to update. You can send one or multiple fields.
 *     responses:
 *       200:
 *         description: Song updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d21b4967d0d8992e610c85
 *                 title:
 *                   type: string
 *                   example: Willow
 *                 artist:
 *                   type: string
 *                   example: Taylor Swift
 *                 album:
 *                   type: string
 *                   example: Evermore
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   example: 2020-12-11
 *                 duration:
 *                   type: string
 *                   example: "03:34"
 *       404:
 *         description: Song not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Song not found
 *       500:
 *         description: Server error, something went wrong while updating the song.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
router.patch('/updateProperties/:id', updateProperties);

router.post('/multiple', createMultipleSongs);

router.delete('deleteAll', deleteAll);

export default router;