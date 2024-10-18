import { Router } from 'express';
import { createSong,deleteSong, getSongDetails, updateSong} from '../Controllers/song.controller';
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

router.post('/deleteSong', deleteSong as any);

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

router.post('/updateSong', updateSong as any);

/**
 * @swagger
 * /getSongDetails:
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


router.post('/getSongDetails', getSongDetails as any);

export default router;