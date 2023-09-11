const {client} = require("./index")

/* THIS IS FOR THE getAllProductReviews ADAPTER */
async function getAllProductReviews() {
	try {
        const { rows: reviews } = await client.query(`
        SELECT *
        FROM reviews
		`);

		return reviews;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/* THIS IS TO create reviews  */
async function makeReview( {title, content, userId, productId} ) {
	try{
		const {rows: [review] } = await client.query(`
		INSERT INTO reviews (title, content, "userId", "productId")
		VALUES ($1, $2, $3, $4)
		RETURNING *;
		`, [title, content, userId, productId]);

		const {rows: [user] } = await client.query(`
		SELECT reviews.*, users.username AS creatorName
		FROM users
		JOIN reviews ON reviews."userId"=users.id
		WHERE reviews."userId"=${userId}
		`)
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getReviewsByProductId(id){
    try{
        const {rows: reviews} = await client.query(`
        SELECT *
        FROM reviews
        WHERE "productId"=$1
        `,[id])
        return reviews;
    }catch(error){
        throw error;
    }
}



module.exports = {
	getAllProductReviews,
	makeReview,
	getReviewsByProductId
}