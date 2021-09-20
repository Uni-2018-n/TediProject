function transpose(a)
{
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
  // or in more modern dialect
  // return a[0].map((_, c) => a.map(r => r[c]));
}

function dot(a, b) {a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);}

const matrix_factorization = async (R, P, Q, K, steps=5000, alpha=0.0002, beta=0.02) => {
    R = transpose(R);

    for (const step = 0; step < steps; step++) {
        for (const i = 0; i < R.length; i++) {
            for (const j = 0; j < R[i].lengthl; j++) {
                if (R[i][j] > 0) {
                    eij = R[i][j] - dot(P[i], Q[j]);
                }
            }
        }
    }
}