import { Router } from 'express';
import { createAlbum,deleteAlbum, updateAlbum, getAlbumDetails} from '../Controllers/album.controller';

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
 *               
 *               artist:
 *                 type: string
 *                 description: Nombre del artista
 *                 
 *               realeaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de lanzamiento del álbum
 *                 
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
 *                 realeaseDate:
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
 * /deleteAlbum:
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
 *                   
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
 *                  
 *       500:
 *         description: An error occurred while deleting album. Try again.
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

router.post('/deleteAlbum', deleteAlbum as any);

/**
 * @swagger
 * /updateAlbum:
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
 *                 example: "Divide"
 *               artist:
 *                 type: string
 *                 description: Nombre del artista
 *                 example: "Ed Sheeran"
 *               realeaseDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de lanzamiento del álbum
 *                 
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de canciones en el álbum
 *                 
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
 *                 realeaseDate:
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
 *                   description: Mensaje de error cuando el álbum no se encuentra
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
 *                   description: Mensaje de error del servidor
 *                  
 */

router.post('/updateAlbum', updateAlbum as any);

/**
 * @swagger
 * /getAlbumDetails:
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
 *                 realeaseDate:
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
 *                   
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
 *                   
 */

router.post('/getAlbumDetails', getAlbumDetails as any);


