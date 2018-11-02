# moneyWordsGenerator
超级简单而且小巧的数字转中文大写
一、使用方法：
----------------------
var number = '50.25';//必须是字符串形式的数字，数字类型可以用toFixed(2),保留两位小数
var convertor = new MoneyWordsGenerator();
var result = convertor.moneyToBigChar(number);
$('.before').text(number);
$('.after').text(result);
