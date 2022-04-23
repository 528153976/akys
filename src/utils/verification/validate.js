const useRequire = {
    required: true,
    message: ''
}
export const familyValidate = {
    xm: [useRequire],
    sfz: [useRequire, {
        pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0\d|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        message: '请输入合法的身份证号',
    },],
    xb: [useRequire],
    nl: [useRequire, { type: "number", min: 0, message: "值必须为数字值且大于0" }],
    gx: [useRequire],
    hkszd: [useRequire],
}
export const validate = {
    sqrzjhm: [ //请输入身份证号码
        { required: true, message: ' ' },
        {
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0\d|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
            message: '请输入合法的身份证号',
        }
    ],
};
/**
 * 数值范围
 */
function compare(value, rule) {
    let pattern = /^-?(0|([1-9]\d*))(\.\d+)?$/;// 数字
    const min = rule.min === undefined ? -Infinity : rule.min; //最小值
    const max = rule.max === undefined ? Infinity : rule.max; // 最大值
    return pattern.test(value) && value >= min && value <= max;
}



