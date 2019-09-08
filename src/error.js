let methods = {};

methods.jsonError = function(error, msg, data, httpError)
{
    let stack = new Error().stack.split("\n");
    for (let i = 0; i < stack.length; i++)
        stack[i] = stack[i].trim();

    let err =
        {
            error: error,
            message: msg,
            data: data,
            stack: stack
        };

    if (httpError)
        err.httpError = httpError;

    return err;
};

methods.addJSONError = function(req, res, next)
{
    res.jsonError = function(error, message, data, httpCode)
    {
        res.json(methods.jsonError(error, message, data, httpCode));
    };
    next();
};

module.exports = methods;