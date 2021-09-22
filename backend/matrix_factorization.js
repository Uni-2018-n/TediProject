dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
transpose = a => a[0].map((x, i) => a.map(y => y[i]));

function mmultiply(a, b) {
    return a.map(x => transpose(b).map(y => dotproduct(x, y)));
}

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
}

const matrix_factorization = async (R, P, Q, K, steps=50000, alpha=0.0002, beta=0.02) => {
    Q = transpose(Q);

    for (let step = 0; step < steps; step++) {
        for (let i = 0; i < R.length; i++) {
            for (let j = 0; j < R[i].length; j++) {
                if (R[i][j] > 0) {
                    const Dot = await dotproduct(P[i], getCol(Q, j));
                    eij = R[i][j] - Dot;
                }

                for (let k = 0; k < K; k++) {
                    P[i][k] = P[i][k] + alpha * (2 * eij * Q[k][j] - beta * P[i][k])
                    Q[k][j] = Q[k][j] + alpha * (2 * eij * P[i][k] - beta * Q[k][j])
                }
            }
        }

        const eR = dotproduct(P, Q);

        let e = 0;

        for (let i = 0; i < R.length; i++) {
            for (let j = 0; j < R[i].length; j++) {
                if (R[i][j] > 0) {
                    e = e + Math.pow(R[i][j] - await dotproduct(P[i], getCol(Q, j)), 2)

                    for (let k = 0; k < K.length; k++) {
                        e = e + (beta/2) * (Math.pow(P[i][k], 2) + Math.pow(Q[k][j], 2))
                    }
                }
            }
        }

        if (e < 0.001) {
            break;
        }
    }

    try {
        const result = await mmultiply(P, Q);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    matrix_factorization, mmultiply, dotproduct
}