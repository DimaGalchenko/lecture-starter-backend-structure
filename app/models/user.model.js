
const getUserById = async (db, id) => {
    return await db("user").where('id', id).returning("*").then(([result]) => {
        return result;
    });
}

const createUser = async (db, user) => {
    return await db("user").insert(user).returning("*").then(([result]) => {
        result.createdAt = result.created_at;
        delete result.created_at;
        result.updatedAt = result.updated_at;
        delete result.updated_at;
        return result;
    }).catch(err => {
        if (err.code === '23505') {
            const error = new Error();
            error.message = err.detail;
            error.status = 400;
            throw error;
        }
    });
}

const updateUser = async (db, userId, userDetails) => {
    return await db("user").where('id', userId).update(userDetails).returning("*").then(([result]) => {
        return result;
    }).catch(err => {
        if (err.code === '23505') {
            const error = new Error();
            error.message = err.detail;
            error.status = 400;
            throw error;
        }
    });
}

const updateUserBalance = async (db, userId, newBalance) => {
    await db("user").where('id', userId).update({ balance: newBalance });
}


module.exports = {createUser, updateUser, getUserById, updateUserBalance};
