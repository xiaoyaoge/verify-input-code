import VerifyInputCode from './verifycode.vue';

if (typeof window !== 'undefined' && window.Vue) {
	Vue.component('verify-input-code', VerifyInputCode);
};

export default VerifyInputCode;
