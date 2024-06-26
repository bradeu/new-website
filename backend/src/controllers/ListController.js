import listModel from "../models/ListModel.js"

export default class ListController {
    
    static create(req, res) {
        const args = req.body;
        const email = req.user.userId;

        listModel.create(args, email).then(() => {
            console.log("List item created successfully");
            res.status(200).json({message: "List item created successfully"});
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    }

    static read(req, res) {
        const email = req.user.userId;

        listModel.read(email).then(result => {
            if (result) {
                console.log("List read successfully");
                res.status(200).json({result: result});
            } else {
                console.log("Not Found");
                res.status(500).json({message: "Not found"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    }

    static update(req, res) {
        const args = req.body;
        const email = req.user.userId;

        listModel.update(args, email).then(() => {
            console.log("List item updated successfully");
            res.status(200).json({message: "List item updated successfully"});
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    }

    static delete(req, res) {
        const args = req.body;
        const email = req.user.userId;

        listModel.delete(args, email).then(() => {
            console.log("List item deleted successfully");
            res.status(200).json({message: "List item deleted successfully"});
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    }
}