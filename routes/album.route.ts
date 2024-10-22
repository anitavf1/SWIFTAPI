import { NextFunction, Router, Request, Response } from 'express';
import { createAlbum, deleteAlbum, updateAlbum, getAlbumDetails, getAlbums } from '../Controllers/album.controller';
import redis from 'redis';
import { updateProperties } from '../Controllers/user.controller';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

const router = Router();

/**
 * @swagger
 * /createAlbum:
 *   post:
 *     summary: Create a new album
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               album:
 *                 type: string
 *                 description: Nombre del álbum
 *               artist:
 *                 type: string
 *                 description: Nombre del artista
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de lanzamiento del álbum
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de canciones en el álbum
 *     responses:
 *       201:
 *         description: Album created with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del nuevo álbum creado
 *                 album:
 *                   type: string
 *                   description: Nombre del álbum
 *                 artist:
 *                   type: string
 *                   description: Nombre del artista
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de lanzamiento del álbum
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de canciones
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/createAlbum', createAlbum);

/**
 * @swagger
 * /deleteAlbum/{id}:
 *   delete:
 *     summary: Delete an album by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum a eliminar
 *     responses:
 *       200:
 *         description: Album deleted with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       404:
 *         description: Album not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando el álbum no se encuentra
 *       500:
 *         description: An error occurred while deleting the album. Try again.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error ocurrido
 */
router.delete('/deleteAlbum/:id', deleteAlbum as any);

/**
 * @swagger
 * /updateAlbum/{id}:
 *   put:
 *     summary: Update an existing album by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               album:
 *                 type: string
 *                 description: Nombre del álbum
 *               artist:
 *                 type: string
 *                 description: Nombre del artista
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de lanzamiento del álbum
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de canciones en el álbum
 *     responses:
 *       200:
 *         description: Album updated with success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del álbum actualizado
 *                 album:
 *                   type: string
 *                   description: Nombre del álbum
 *                 artist:
 *                   type: string
 *                   description: Nombre del artista
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de lanzamiento del álbum
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de canciones
 *       404:
 *         description: Album not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                  
 *       500:
 *         description: An error occurred while updating the album
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   
 */

router.put('/updateAlbum/:id', updateAlbum as any);


/**
 * @swagger
 * /getAlbumDetails/{id}:
 *   get:
 *     summary: Get the details of an album by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del álbum a obtener
 *     responses:
 *       200:
 *         description: Album details showed correctly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del álbum
 *                 album:
 *                   type: string
 *                   description: Nombre del álbum
 *                 artist:
 *                   type: string
 *                   description: Nombre del artista
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de lanzamiento del álbum
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de canciones en el álbum
 *       404:
 *         description: Album not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando el álbum no se encuentra
 *       500:
 *         description: An error occurred while fetching the album details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error del servidor
 */
router.get('/getAlbumDetails/:id', getAlbumDetails as any)


/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Retrieve a list of albums with optional filters
 *     description: Get a paginated list of albums based on their release date. You can filter by release date and use pagination with `page` and `limit`.
 *     tags:
 *       - Albums
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of albums to retrieve per page (default is 10).
 *       - in: query
 *         name: releaseDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2022-01-01
 *         description: Filter albums by their release date.
 *     responses:
 *       200:
 *         description: A list of albums.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 albums:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4967d0d8992e610c85
 *                       title:
 *                         type: string
 *                         example: Evermore
 *                       artist:
 *                         type: string
 *                         example: Taylor Swift
 *                       releaseDate:
 *                         type: string
 *                         format: date
 *                         example: 2020-12-11
 *                       genre:
 *                         type: string
 *                         example: Pop
 *       400:
 *         description: Bad request, invalid parameters.
 *       500:
 *         description: Server error, something went wrong.
 */

router.get('/getAlbums', getAlbums as any)

/**
 * @swagger
 * /albums/{id}:
 *   put:
 *     summary: Update album properties
 *     description: Update specific properties of an album by its ID. You can send any property in the request body, and only those will be updated.
 *     tags:
 *       - Albums
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the album to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Evermore
 *               artist:
 *                 type: string
 *                 example: Taylor Swift
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2020-12-11
 *               genre:
 *                 type: string
 *                 example: Pop
 *               trackCount:
 *                 type: integer
 *                 example: 17
 *             description: Properties of the album to update. You can send one or multiple fields.
 *     responses:
 *       200:
 *         description: Album updated successfully.
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
 *                   example: Evermore
 *                 artist:
 *                   type: string
 *                   example: Taylor Swift
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   example: 2020-12-11
 *                 genre:
 *                   type: string
 *                   example: Pop
 *                 trackCount:
 *                   type: integer
 *                   example: 17
 *       404:
 *         description: Album not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Album not found
 *       500:
 *         description: Server error, something went wrong while updating the album.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */

router.patch('updateProperties', updateProperties)

export default router;
