const express = require('express');
const router = express.Router();
const Folder = require('../model/folder');
const Integration = require('../model/integration');
const Access = require('../model/acces');
const User = require('../model/user');
const { authenticate, authorize } = require('../middelware/auth');

router.get('/', async (req, res, next) => {
    try {
        const folders = await Folder.findAll();
        res.json(folders);
    } catch (err) {
        next(err);
    }
});

router.get('/access', async (req, res, next) => {
    try {
        const accesses = await Access.findAll();
        res.json(accesses);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { folderName, documentID } = req.body;
        const newFolder = await Folder.create({ folderName });
        const folderID = newFolder.folderID;
        await Integration.create({ folderID, documentID });
        res.status(201).json(newFolder);
    } catch (err) {
        next(err);
    }
});

router.put('/:folderID', async (req, res, next) => {
    try {
        const { folderName } = req.body;
        const folder = await Folder.findByPk(req.params.folderID);
        if (folder) {
            folder.folderName = folderName;
            await folder.save();
            res.json(folder);
        } else {
            res.status(404).json({ message: 'Folder not found' });
        }
    } catch (err) {
        next(err);
    }
});

router.put('/access/:folderID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const { userName } = req.body;
        const folderID = req.params.folderID;

        const folder = await Folder.findByPk(folderID);

        if (folder) {
            const integrations = await Integration.findAll({ where: { folderID } });

            if (integrations.length === 0) {
                return res.status(404).json({ message: 'No integrations found for the folder' });
            }

            const integrationID = integrations[0].integrationID;

            const users = await User.findAll({ where: { userName } });

            if (users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userID = users[0].userID;

            await Access.create({ integrationID, userID });

            res.json({ message: 'Access granted', folder, access: { integrationID, userID } });
        } else {
            res.status(404).json({ message: 'Folder not found' });
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:folderID', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const folder = await Folder.findByPk(req.params.folderID);
        if (folder) {
            // Delete associated integrations first
            await Integration.destroy({ where: { folderID: folder.folderID } });

            // Now delete the folder
            await folder.destroy();
            res.json({ message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Folder not found' });
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;
