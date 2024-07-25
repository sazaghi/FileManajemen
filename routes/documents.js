var express = require('express');
var router = express.Router();
var Document = require('../model/document');

router.get('/', async (req, res, next) => {
    try {
        const Documents = await Document.findAll();
        res.json(Documents);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { documentName, content } = req.body;
        const newDocument = await Document.create({ documentName, content });
        res.status(201).json(newDocument);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { documentName, content } = req.body;
        const Documents = await Document.findByPk(req.params.id);
        if (Documents) {
            Documents.documentName = documentName;
            Documents.content = content;
            await Documents.save();
            res.json(Documents);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const Documents = await Document.findByPk(req.params.id);
        if (Documents) {
            await Documents.destroy();
            res.json({ message: 'Document Deleted' });
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;