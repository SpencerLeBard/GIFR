import express from "express";
import BaseController from "../utils/BaseController";
import { valuesService } from "../services/ValuesService";
import { Auth0Provider } from "@bcwdev/auth0provider";

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
        } catch (error) {
            next(error)
        }
    }

    async getUserPosts(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    async createPost(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    async editPost() {
        try {

        } catch (error) {
            next(error)
        }
    }

    async deletePost() {
        try {

        } catch (error) {
            next(error)
        }
    }
}