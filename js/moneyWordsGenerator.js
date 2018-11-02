/**
 * @author YuPeng
 * 金额数字转换为大写对象
 * 使用：
 * var g = new MoneyWordsGenerator（）;
 * g.moneyToBigChar(25125.52);
 * @constructor
 */
var MoneyWordsGenerator = function(){
	var numberChars = [{"0":"零"},{"1":"壹"},{"2":"贰"},{"3":"叁"},{"4":"肆"},{"5":"伍"},
		{"6":"陆"},{"7":"柒"},{"8":"捌"},{"9":"玖"}];
	var levelChars = ["","萬","亿"];
	var gLevelChars = ["","拾","佰","仟"];
	var unitChars = ["圆","角","分"];
	function numberToBigChar(numberChar){
		var bigMoneyStr="";
		var length = numberChar.length;
		if(length>4 || length==0){
			return;
		}
		var flag = length;
		if(numberChar[length-1]=='0'){
			flag--;
			if(numberChar[length-2]=='0'){
				flag--;
				if(numberChar[length-3]=='0'){
					flag--;
					if(numberChar[length-4]=='0'){
						flag--;
					}
				}

			}
		}
		if (flag<=0)return "";
		for(var i=0;i<flag;i++){
			if(numberChars[numberChar[i]]){
				var obj = numberChars[numberChar[i]];
				for(var item in obj){
					bigMoneyStr+=((length==1 && numberChar[i]==0)?"":obj[item]);
					bigMoneyStr+=gLevelChars[length-1];
				}
				length--;
			}
		}
		return bigMoneyStr;
	}
	this.moneyToBigChar = function(money){
		if(parseFloat(money)==0)return "零";
		if(typeof money=="number")JSON.stringify(money);
		var moneySplit = money.split(".");
		var big = moneySplit[0];
		var small = moneySplit[1];
		var bigChars = big.split("");
		var pp = bigChars.length/4;
		var smallMoneyStr = "";
		if(small && small!="00"){
			var smallChars = small.split("");
			for(var i=0;i<smallChars.length;i++){
				if(numberChars[smallChars[i]]){
					var obj = numberChars[smallChars[i]];
					for(var item in obj){
						smallMoneyStr+=obj[item]+(i==0?unitChars[1]:i==1?unitChars[2]:"");
					}
				}
			}
		}
		if(pp<=1){
			var result = numberToBigChar(bigChars)+unitChars[0]+((smallMoneyStr && smallMoneyStr.trim()!='')?smallMoneyStr:"整");
			return result;
		}
		var prefix = bigChars.length%4;
		var arr = [];
		var argArr = [];
		for(var i=0;i<bigChars.length;i++){
			if(prefix!=0 && i<prefix){
				argArr.push(bigChars[i]);
				if(argArr.length==prefix){
					arr.push([].concat(argArr));
					argArr.splice(0,argArr.length);
				}
				continue;
			}
			argArr.push(bigChars[i]);
			if(argArr.length==4){
				arr.push([].concat(argArr));
				argArr.splice(0,argArr.length);
			}
		}
		arr = arr.reverse();
		var bigMoneyStr = "";
		for(var k=arr.length-1;k>=0;k--){
			console.log(arr[k]);
			bigMoneyStr+=numberToBigChar(arr[k])+levelChars[k];
		}
		console.log("result="+bigMoneyStr+unitChars[0]+((smallMoneyStr && smallMoneyStr.trim()!='')?smallMoneyStr:"整"));
		return bigMoneyStr+unitChars[0]+((smallMoneyStr && smallMoneyStr.trim()!='')?smallMoneyStr:"整");
	}

}