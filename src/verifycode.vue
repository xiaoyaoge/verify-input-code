<template type="x/template">
	<div class="verify_input_code">
		<div class="input" @click="focusInput" :style="{'height':height}">
      <div class="input-code" :class="{first: inputCodeNum===0, last: inputCodeNum === 6}" :style="{left: left, 'z-index': zIndex, 'height': height, 'width': blockSize - 1 + '%'}">
      	<template v-if="type==='number'">
      		<input ref="input_code" type="tel" :style="{'font-size': inputSize, 'color': inputColor}" @keyup="inputCodeEvent($event)" @blur="blurInput" v-model="inputCode" autofocus maxlength="1" @keyup.delete="deleteInput">
      	</template>
        <template v-else>
		  		<input ref="input_code" type="text" :style="{'font-size': inputSize, 'color': inputColor}" @keyup="inputCodeEvent($event)" @blur="blurInput" v-model="inputCode" autofocus maxlength="1" @keyup.delete="deleteInput">
      	</template>
      </div>
      <span v-for="(item,index) in block" :style="{'font-size': sSize, 'color': sColor, 'height': height, 'line-height': height, 'width': blockWidth}" v-text="codeArray[index] ? codeArray[index] : ''" :class="{'first':index === 0, 'last': index === number - 1}"></span> 
    </div>
	</div>
</template>

<script type="text/babel">
let timer = null;

export default {
	props: {
		code: { //接收一个可以改变父组件的数据(引用类型才可以修改,所以这里是引用类型)
			type: Array,
			default: () => [],
			required: true
		},
		success: { //输入完成后的回调
			type: Function,
			default: () => {}
		},
		error: {//输入错误的时候调用的函数
			type: Function,
			default: () => {}
		},
		getInput: {  //输入都回调
			type: Function,
			default: () => {}
		},
		sSize: { // 显示字体大小
			type: String,
			default: "20px"
		},
		sColor: { // 显示字体颜色
			type: String,
			default: "#f35252"
		},
		inputSize: { //输入框字体大小
			type: String,
			default: "20px"
		},
		inputColor: { //输入框字体颜色
			type: String,
			default: "#000"
		},
		height: { //输入框高度
			type: String,
			default: "40px"
		},
		number: { //验证码个数
			type: Number,
			default: 6,
		},
		type: { //输入类型,有number,text
			type: String,
			default: "number",
			validator: (value) => {
				return ['number', 'text','idcard'].indexOf(value) > -1;
			}
		},
		upperCase: { //输入的字母是否需要大写
			type: Boolean,
			default: false
		} 
	},
	data () {
		return {
			inputCodeNum: 0, //输入框的位置
			left: "0", //输入框距离左边的距离
			inputCode: "", //单次输入的值
			codeArray: [], //输入的值数组 
			blockWidth: (100/this.number).toFixed(4)+'%', //每个格子的宽度
			blockSize: (100/this.number).toFixed(4), //计算用宽度
			block: [], //存放格子

			zIndex: 10 //输入框层级(开始默认最高)
		}
	},
	created(){ //获取格子数并保持方便循环 
		for(let i = 0;i < this.number; i++){
			this.block.push(i);
		}
	},
	computed:{
		codeString() {
			let data = "";
			this.codeArray.map(item => {
				data += item;
			});
			return data;
		}
	},
	methods:{
		initInput(){ //调用初始化组件
			for(let i = this.number; i >=0; i-- ){
				this.deleteInput();
			}
		}, 
		deleteInput() { //删除输入内容
			if(this.inputCodeNum === this.number - 1) {
				this.inputCodeNum--;
				this.left = (this.blockSize * this.inputCodeNum) + "%";
				this.codeArray.pop();
				this.code.pop();
				this.getInput(this.codeString);//回调获取输入值
				return;
			}
			if(this.inputCodeNum !== 0) {
				this.inputCodeNum--;
				this.codeArray.pop();
				this.code.pop();
				this.left = (this.blockSize * this.inputCodeNum) + '%'
				this.getInput(this.codeString);//回调获取输入值
			}
		}, 
		inputCodeEvent(event) { //每次输入的事件处理
			if (!this.inputCode) return;
			if (this.type === "number" && (event.keyCode < 48 || event.keyCode > 57)) {// 要求输入数字类型 
				if (!this.error(this.inputCode)) { //判断输入的值是否正确 
					this.inputCode = '';
					return;
				}
			}
			if(this.type==="idcard" ){
				if(this.inputCodeNum < this.number-1){
					if(event.keyCode < 48 || event.keyCode > 57){ 
						if (!this.error(this.inputCode)) { //判断输入的值是否正确 
							this.inputCode = '';
							return;
						}
					}
				}else{
					if(this.inputCodeNum === this.number - 1){
						if((event.keyCode < 48 || event.keyCode > 57) && event.keyCode !== 88){ 
							this.inputCode = '';
							return; 
						}
					}
				}
			}
			this.upperCase && (this.inputCode = this.inputCode.toUpperCase()); 
			if(this.inputCodeNum < this.number-1){
				this.codeArray.push(this.inputCode);
				this.code.push(this.inputCode);
				this.inputCode = '';
				this.inputCodeNum++;
				this.left = (this.blockSize * this.inputCodeNum) + '%';

				this.getInput(this.codeString);//回调获取输入值
			} else{
				if(this.inputCodeNum === this.number - 1){
					this.inputCodeNum++;
					this.codeArray.push(this.inputCode);
					this.code.push(this.inputCode);
					this.success(this.codeString);//输入完成后返回所有值字符串
					this.getInput(this.codeString);//回调获取输入值
				}
			}
		}, 
		blurInput(){ //失去焦点
			this.zIndex = -10;
		}, 
		focusInput(){ //获得焦点
			this.zIndex = 10;
			this.$refs.input_code.focus();
		}
	}
}
</script>

<style lang="css" scoped>
@import "../dist/inputcode.css";
</style>