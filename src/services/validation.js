const _apply_to_all = (arr, ...func_arr) => {
    for (const obj of arr) {
        for (const func of func_arr) {
            if (!func(obj)) {
                return false;
            }
        }
    }
    return true;
};

export const isNotEmpty = (...strings) => _apply_to_all(strings, str => !!str);

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/* eslint-enable */
export const isValidEmail = (...strings) => isNotEmpty(strings) && _apply_to_all(strings, emailRegex.test.bind(emailRegex));
