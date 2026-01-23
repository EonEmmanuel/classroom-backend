import express from 'express';
import {and, ilike, or, sql} from "drizzle-orm";
import {departments, subjects} from "../db/schema";

const router = express.Router();

// Get all subjects with optional search, filtering and pagination
router.get('/', async (req, res) => {
    try {
        const {search, department, page = 1, limit = 10} = req.query;

        const currentPage = Math.max(1, +page);
        const limitPerPage = Math.max(1, +limit);
        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        //if a search query exists, filter by subject name or subject code
        if(search) {
            filterConditions.push(
                or(
                    ilike(subjects.name, `${search}`),
                    ilike(subjects.code, `${search}`)
                )
            )
        }

        //if a search department search query exists, match the department name
        if(department){
            filterConditions.push(ilike(departments.name, `${department}`));
        }

        //Combine all filters using AND id any exist
        const whereClaus = filterConditions.length > 0 ? and(...filterConditions) : undefined;



    } catch (e) {
        console.error(`GET /subjects error: ${e}`);
        res.status(500).json({error: "Failed to get subjects"});
    }
})