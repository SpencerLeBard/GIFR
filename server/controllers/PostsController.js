import express from "express";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService";

export class PostsController extends BaseController {
    constructor() {
        super('api/posts');
        this.router
            .get("", this.getAllPosts)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get("", this.getUserPosts)
            .put("/:id", this.editPost)
            .post("", this.createPost)
            .delete("/:id", this.deletePost)
    }

    async getAllPosts(req, res, next) {
        try {
            let posts = await postsService.getAllPosts(req.query)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async getUserPosts(req, res, next) {
        try {
            let posts = await postsService.getUserPosts(req.userInfo.email)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async createPost(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let posts = await postsService.createPost(req.body)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async editPost(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let posts = await postsService.editPost(req.body)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req, res, next) {
        try {
            let deletedPost = await postsService.deletePost(req.params.id, req.userInfo.email)
            res.send("Successfully deleted post")
        } catch (error) {
            next(error)
        }
    }
}