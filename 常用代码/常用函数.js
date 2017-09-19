(function(window){
		/*ES5数组方法兼容
		*/
		/*forEach*/
		if (typeof Array.prototype.forEach != "function") {
		  	Array.prototype.forEach = function (fn, context) {
		    	for (var k = 0, length = this.length; k < length; k++) {
		      		if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
		        		fn.call(context, this[k], k, this);
		      		}
		    	}
		  	};
		}
		/*map*/
		if (typeof Array.prototype.map != "function") {
		  	Array.prototype.map = function (fn, context) {
		    	var arr = [];
		    	if (typeof fn === "function") {
		      		for (var k = 0, length = this.length; k < length; k++) {      
		         		arr.push(fn.call(context, this[k], k, this));
		      		}
		    	}
		    	return arr;
		  	};
		}
		/*filter*/
		if (typeof Array.prototype.filter != "function") {
		  	Array.prototype.filter = function (fn, context) {
		    	var arr = [];
		    	if (typeof fn === "function") {
		       		for (var k = 0, length = this.length; k < length; k++) {
		          		fn.call(context, this[k], k, this) && arr.push(this[k]);
		       		}
		    	}
		    	return arr;
		  	};
		}
		/*some*/
		if (typeof Array.prototype.some != "function") {
		  	Array.prototype.some = function (fn, context) {
				var passed = false;
				if (typeof fn === "function") {
		   	  	for (var k = 0, length = this.length; k < length; k++) {
				  	if (passed === true) break;
				  		passed = !!fn.call(context, this[k], k, this);
			  		}
		    	}
				return passed;
		  	};
		}
		/*every*/
		if (typeof Array.prototype.every != "function") {
			Array.prototype.every = function (fn, context) {
			    var passed = true;
			    if (typeof fn === "function") {
			       	for (var k = 0, length = this.length; k < length; k++) {
			          	if (passed === false) break;
			          	passed = !!fn.call(context, this[k], k, this);
			      	}
			    }
			    return passed;
			};
		}
		/*indexOf*/
		if (typeof Array.prototype.indexOf != "function") {
		  	Array.prototype.indexOf = function (searchElement, fromIndex) {
		    	var index = -1;
		    	fromIndex = fromIndex * 1 || 0;

		    	for (var k = 0, length = this.length; k < length; k++) {
		      		if (k >= fromIndex && this[k] === searchElement) {
		          		index = k;
		          		break;
		      		}
		    	}
		    	return index;
		  	};
		}
		/*reduce*/
		if (typeof Array.prototype.reduce != "function") {
		  	Array.prototype.reduce = function (callback, initialValue ) {
		     	var previous = initialValue, k = 0, length = this.length;
		     	if (typeof initialValue === "undefined") {
		        	previous = this[0];
		        	k = 1;
		     	}
		     
		    	if (typeof callback === "function") {
		      		for (k; k < length; k++) {
		         		this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
		      		}
		    	}
		    	return previous;
		  	};
		}
		window.xu = {
			//jsonp跨域相关方法
			JSONP: {
			    // 获取当前时间戳
			    now: function() {
			        return (new Date()).getTime();
			    },
			    
			    // 获取16位随机数
			    rand: function() {
			        return Math.random().toString().substr(2);
			    },
			    
			    // 删除节点元素
			    removeElem: function(elem) {
			        var parent = elem.parentNode;
			        if(parent && parent.nodeType !== 11) {
			            parent.removeChild(elem);
			        }
			    },
			    
			    // url组装
			    parseData: function(data) {
			        var ret = "";
			        if(typeof data === "string") {
			            ret = data;
			        }
			        else if(typeof data === "object") {
			            for(var key in data) {
			                ret += "&" + key + "=" + encodeURIComponent(data[key]);
			            }
			        }
			        // 加个时间戳，防止缓存
			        ret += "&_time=" + this.now();
			        ret = ret.substr(1);
			        return ret;
			    },
			    
			    getJSON: function(url, data, func) {
			        // 函数名称
			        var name;
			        
			        // 拼装url
			        url = url + (url.indexOf("?") === -1 ? "?" : "&") + this.parseData(data);
			        
			        // 检测callback的函数名是否已经定义
			        var match = /callback=(\w+)/.exec(url);
			        if(match && match[1]) {
			            name = match[1];
			        } else {
			            // 如果未定义函数名的话随机成一个函数名
			            // 随机生成的函数名通过时间戳拼16位随机数的方式，重名的概率基本为0
			            // 如:jsonp_1355750852040_8260732076596469
			            name = "jsonp_" + this.now() + '_' + this.rand();
			            // 把callback中的?替换成函数名
			            url = url.replace("callback=?", "callback="+name);
			            // 处理?被encode的情况
			            url = url.replace("callback=%3F", "callback="+name);
			        }
			        
			        // 创建一个script元素
			        var script = document.createElement("script");
			        script.type = "text/javascript";
			        // 设置要远程的url
			        script.src = url;
			        // 设置id，为了后面可以删除这个元素
			        script.id = "id_" + name;
			        
			        // 把传进来的函数重新组装，并把它设置为全局函数，远程就是调用这个函数
			        window[name] = function(json) {
			            // 执行这个函数后，要销毁这个函数
			            window[name] = undefined;
			            // 获取这个script的元素
			            var elem = document.getElementById("id_" + name);
			            // 删除head里面插入的script，这三步都是为了不影响污染整个DOM啊
			            JSONP.removeElem(elem);
			            // 执行传入的的函数
			            func(json);
			        };
			        
			        // 在head里面插入script元素
			        var head = document.getElementsByTagName("head");
			        if(head && head[0]) {
			            head[0].appendChild(script);
			        }
			    }
			},
		
			/*固定时间的setInterval
		    fn：回调函数
		    wait: 时间间隔
		    */
			interval : function(fn,wait){
				var inter = function(){
					fn.call(null);
					setTimeout(fn,wait);
				};
				setTimeout(inter,wait);
			},

			// ajax
			createXHR : function(){
				if (typeof XMLHttpRequest != "undefined") {
					return new XMLHttpRequest();
				}else if(typeof ActiveXObject != "undefined"){
					return new ActiveXObject(arguments.callee.activeXString);
				}else{
					throw new Eerro("NO XHR object available");
				}
			},

			/*事件监听
			elem: DOM元素节点
		    type：事件类型
		    fn：回调函数
		    */
			addEvent : function(elem, type, fn) {
			    if (elem.attachEvent) {
			        elem.attachEvent('on' + type, fn);
			        return;
			    }
			    if (elem.addEventListener) {
			        elem.addEventListener(type, fn, false);
			    }
			},
			
			/*移除事件监听
			elem: DOM元素节点
		    type：事件类型
		    fn：回调函数
		    */
			removeEvent : function(elem, type, fn) {
			    if (elem.detachEvent) {
			        elem.detachEvent('on' + type, fn);
			        return;
			    }
			    if (elem.removeEventListener) {
			        elem.removeEventListener(type, fn, false);
			    }
			},

			/*去除空格
		    type 1-所有空格  2-前后空格  3-前空格 4-后空格
		    */
			trim : function(str, type){
				switch(type){
					case 1:
						return str.replace(/\s+/g, '');
					case 2:
						return str.replace(/(^\s*)|(\s*$)/g, '');
					case 3:
						return str.replace((/^\s*/g, '');
					case 4:
						return str.replace((/\s*$/g, '');
					default:
						return str;
				}
			},

			/*字符串大小写转换
			str：字符串
			type：
		    1:首字母大写
		    2：首页母小写
		    3：大小写转换
		    4：全部大写
		    5：全部小写
		    */
		    changeCase: function (str, type) {
		        function ToggleCase(str) {
		            var itemText = ""
		            str.split("").forEach(
		                function (item) {
		                    if (/^([a-z]+)/.test(item)) {
		                        itemText += item.toUpperCase();
		                    }
		                    else if (/^([A-Z]+)/.test(item)) {
		                        itemText += item.toLowerCase();
		                    }
		                    else{
		                        itemText += item;
		                    }
		                });
		            return itemText;
		        }

		        switch (type) {
		            case 1:
		                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
		                    return v1.toUpperCase() + v2.toLowerCase();
		                });
		            case 2:
		                return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
		                    return v1.toLowerCase() + v2.toUpperCase();
		                });
		            case 3:
		                return ToggleCase(str);
		            case 4:
		                return str.toUpperCase();
		            case 5:
		                return str.toLowerCase();
		            default:
		                return str;
		        }
		    },

		    /*字符串循环全复制
			str：字符串
			count: 复制次数
		    */
		    repeatStr: function (str, count) {
		        var text = '';
		        for (var i = 0; i < count; i++) {
		            text += str;
		        }
		        return text;
		    },
		    
		    /*字符串替换
			str：字符串
			AReg: 要替换的字符的正则
			ARepText: 替换内容
		    */
		    replaceStrAll: function (str, AReg, ARepText) {
		        return str.replace(AReg, ARepText);
		    },
		    
		    /*字符替换为特殊字符如*
		    str:字符串
		    regArr:字符格式, 
		    type:替换方式,
		    ARepText:替换的字符（默认*）
		    */
		    replaceStr: function (str, regArr, type, ARepText) {
		        var regtext = '', 
		        	Reg = null, 
		        	replaceText = ARepText || '*';
		        //replaceStr('18819322663',[3,5,3],0)
		        //188*****663
		        //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
		        if (regArr.length === 3 && type === 0) {
		            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
		            Reg = new RegExp(regtext);
		            var replaceCount = this.repeatStr(replaceText, regArr[1]);
		            return str.replace(Reg, '$1' + replaceCount + '$2')
		        }
		        //replaceStr('asdasdasdaa',[3,5,3],1)
		        //***asdas***
		        else if (regArr.length === 3 && type === 1) {
		            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
		            Reg = new RegExp(regtext);
		            var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
		            var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
		            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
		        }
		        //replaceStr('1asd88465asdwqe3',[5],0)
		        //*****8465asdwqe3
		        else if (regArr.length === 1 && type == 0) {
		            regtext = '(^\\w{' + regArr[0] + '})'
		            Reg = new RegExp(regtext);
		            var replaceCount = this.repeatStr(replaceText, regArr[0]);
		            return str.replace(Reg, replaceCount)
		        }
		        //replaceStr('1asd88465asdwqe3',[5],1,'+')
		        //"1asd88465as+++++"
		        else if (regArr.length === 1 && type == 1) {
		            regtext = '(\\w{' + regArr[0] + '}$)'
		            Reg = new RegExp(regtext);
		            var replaceCount = this.repeatStr(replaceText, regArr[0]);
		            return str.replace(Reg, replaceCount)
		        }
		    },
		    /*检测字符串
		    checkType('165226226326','phone')
		    false*/
		    checkType: function (str, type) {
		        switch (type) {
		            case 'email':
		                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		            case 'phone':
		                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
		            case 'tel':
		                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		            case 'number':
		                return /^[0-9]$/.test(str);
		            case 'english':
		                return /^[a-zA-Z]+$/.test(str);
		            case 'chinese':
		                return /^[\u4E00-\u9FA5]+$/.test(str);
		            case 'lower':
		                return /^[a-z]+$/.test(str);
		            case 'upper':
		                return /^[A-Z]+$/.test(str);
		            default :
		                return true;
		        }
		    },

		    /*检测密码强度
		    str: 字符串
		    e.g：checkPwd('12asdASAD')
		    3(强度等级为3)*/
		    checkPwd: function (str) {
		        var nowLv = 0;
		        if (str.length < 6) {
		            return nowLv
		        }
		        ;
		        if (/[0-9]/.test(str)) {
		            nowLv++
		        }
		        ;
		        if (/[a-z]/.test(str)) {
		            nowLv++
		        }
		        ;
		        if (/[A-Z]/.test(str)) {
		            nowLv++
		        }
		        ;
		        if (/[\.|-|_]/.test(str)) {
		            nowLv++
		        }
		        ;
		        return nowLv;
		    },

		    /*生成随机码
		    count：进制，取值范围0-36
		    len：长度*/
		    randomNumber: function (count, len) {
		        return Math.random().toString(count).substring(2,len+2);
		    },

		    /*计算字符串出现次数
		    str：字符串
		    strSplit: 查找的字符串*/
		    countStr: function (str, strSplit) {
		        return str.split(strSplit).length - 1
		    },


//数组------------------------------------------------------------ 
		    /*数组去重*/
		    removeRepeatArray: function (arr) {
		        return arr.filter(function (item, index, self) {
		            return self.indexOf(item) == index;
		        });
		        //es6
		        //return Array.from(new Set(arr))
		    },

		    /*数组最大值*/
		    maxArr: function (arr) {
		        return Math.max.apply(null, arr);
		    },
		    /*数组最小值*/
		    minArr: function (arr) {
		        return Math.min.apply(null, arr);
		    },

		    /*求和*/
		    sumArr: function (arr,initValue) {
		        return 	arr.reduce(function(pre,next){
						    return pre += next;
						},initValue);
		    },

		    /*平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！*/
		    covArr: function (arr) {
		        var sumText = this.sumArr(arr);
		        return sumText / length;
		    },

		    /*从数组中随机获取元素*/
		    randomOne: function (arr) {
		        return arr[Math.floor(Math.random() * arr.length)];
		    },
		    /*计算元素出现次数
		    obj：为字符串/数组
		    ele: 目标字符/元素
		    */
		    getEleCount: function (obj, ele) {
		        var num = 0;
		        for (var i = 0, len = obj.length; i < len; i++) {
		            if (ele == obj[i]) {
		                num++;
		            }
		        }
		        return num;
		    },
		    /*计算每个元素出现次数
		    默认情况，返回所有元素出现的次数
		    rank：返回出现次数排序前几的
		    ranktype：默认为降序，若为1升序
		    */
		    getCount: function (arr, rank, ranktype) {
		        var obj = {}, k, arr1 = []
		        //记录每一元素出现的次数
		        for (var i = 0, len = arr.length; i < len; i++) {
		            k = arr[i];
		            if (obj[k]) {
		                obj[k]++;
		            }
		            else {
		                obj[k] = 1;
		            }
		        }
		        //保存结果{el-'元素'，count-出现次数}
		        for (var o in obj) {
		            arr1.push({el: o, count: obj[o]});
		        }
		        //排序（降序）
		        arr1.sort(function (n1, n2) {
		            return n2.count - n1.count
		        });
		        //如果ranktype为1，则为升序，反转数组
		        if (ranktype === 1) {
		            arr1 = arr1.reverse();
		        }
		        var rank1 = rank || arr1.length;
		        return arr1.slice(0, rank1);
		    },

		    /*筛选数组
		    val: 删除值
		    type: 若输入%参数，则带有val的都删除
		    */
		    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
		    //["aaa"]   带有'test'的都删除
		    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
		    //["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
		    removeArrayForValue: function (arr, val, type) {
		        arr.filter(function (item) {
		            return type === '%' ? item.indexOf(val) !== -1 : item !== val
		        })
		    },

/*对象及其他--------------------------------------------------------------*/
		    //适配rem
		    getFontSize: function () {
		        var doc = document, win = window;
		        var docEl = doc.documentElement,
		            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		            recalc = function () {
		                var clientWidth = docEl.clientWidth;
		                if (!clientWidth) return;
		                //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
		                if (clientWidth > 750) {
		                    clientWidth = 750
		                }
		                //设置根元素font-size大小
		                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		            };
		        //屏幕大小改变，或者横竖屏切换时，触发函数
		        win.addEventListener(resizeEvt, recalc, false);
		        //文档加载完成时，触发函数
		        doc.addEventListener('DOMContentLoaded', recalc, false);
		    },

		    /*到某一个时间的倒计时*/
		    //getEndTime('2017/7/22 16:0:0')
		    getEndTime: function (endTime) {
		        var startDate = new Date();  //开始时间，当前时间
		        var endDate = new Date(endTime); //结束时间，需传入时间参数
		        var t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
		        var d = 0, h = 0, m = 0, s = 0;
		        if (t >= 0) {
		            d = Math.floor(t / 1000 / 3600 / 24);
		            h = Math.floor(t / 1000 / 60 / 60 % 24);
		            m = Math.floor(t / 1000 / 60 % 60);
		            s = Math.floor(t / 1000 % 60);
		        }
		        return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
		    },

		    /*计算到某一天有多少个星期三*/
		    getTimeCount: function (endTime) {
		        function (endTime) {
		        var startDate = new Date();  //开始时间，当前时间
		        var endDate = new Date(endTime); //结束时间，需传入时间参数
		        var t = endDate.getTime() - startDate.getTime();  //时间差的毫秒数
		        var d = 0, h = 0, m = 0, s = 0;
		        if (t >= 0) {
		            d = Math.floor(t / 1000 / 3600 / 24);
		        }
                var week = Math.floor(d/7);
                var today = startDate.getDay();
                var leftDay = d%7;
                var dayArr = ["星期日", "星期一","星期二","星期三","星期四","星期五","星期六"];
                var obj = {};
                for(var i =0,len = dayArr.length;i<len;i++){
                    obj[dayArr[i]] = week;
                }
                for(i = 1,len = leftDay+1;i<len;i++){
                    today+i<7?
                        obj[dayArr[today+i]] += 1:
                        obj[dayArr[today+i-7]] += 1;
                }
		        return obj;
		    },

		    //随机返回一个范围的数字
		    randomNumber: function (n1, n2) {
		        //randomNumber(5,10)
		        //返回5-10的随机整数，包括5，10
		        if (arguments.length === 2) {
		            return Math.round(n1 + Math.random() * (n2 - n1));
		        }
		        //randomNumber(10)
		        //返回0-10的随机整数，包括0，10
		        else if (arguments.length === 1) {
		            return Math.round(Math.random() * n1)
		        }
		        //randomNumber()
		        //返回0-255的随机整数，包括0，255
		        else {
		            return Math.round(Math.random() * 255)
		        }
		    },

		    /*随机生成颜色*/
		    randomColor: function () {
		        //写法1
		        //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

		        //写法2
		        return '#' + Math.random().toString(16).substring(2).substr(0, 6);

		        //写法3
		        //var color='#',_index=this.randomNumber(15);
		        //for(var i=0;i<6;i++){
		        //color+='0123456789abcdef'[_index];
		        //}
		        //return color;
		    },

		    /*设置url参数
		    setUrlPrmt({'a':1,'b':2})
		    a=1&b=2*/
		    setUrlPrmt: function (obj) {
		        var _rs = [];
		        for (var p in obj) {
		            if (obj[p] != null && obj[p] != '') {
		                _rs.push(p + '=' + obj[p])
		            }
		        }
		        return _rs.join('&');
		    },

		    /*获取url参数
		    getUrlPrmt('segmentfault.com/write?draftId=122000011938')
		    Object{draftId: "122000011938"}*/
		    getUrlPrmt: function (url) {
		        url = url ? url : window.location.href;
		        var _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
		        for (var i = 0, _len = _arrS.length; i < _len; i++) {
		            var pos = _arrS[i].indexOf('=');
		            if (pos == -1) {
		                continue;
		            }
		            var name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
		            _rs[name] = value;
		        }
		        return _rs;
		    },

		    /*清除对象中值为空的属性
		    filterParams({a:"",b:null,c:"010",d:123})
		    Object {c: "010", d: 123}*/
		    filterParams: function (obj) {
		        var _newPar = {};
		        for (var key in obj) {
		            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
		                _newPar[key] = obj[key];
		            }
		        }
		        return _newPar;
		    },

		    /*DOM*/
		    //检测对象是否有给定类名
		    hasClass: function (obj, classStr) {
		        var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
		        return (arr.indexOf(classStr) == -1) ? false : true;
		    },

		    //添加类名
		    addClass: function (obj, classStr) {
		        if (!this.hasClass(obj, classStr)) {
		            obj.className += " " + classStr;
		        }
		    },
		    //删除类名
		    removeClass: function (obj, classStr) {
		        if (this.hasClass(obj, classStr)) {
		            var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
		            obj.className = obj.className.replace(reg, '');
		        }
		    },
		    //替换类名("被替换的类名","替换的类名")
		    replaceClass: function (obj, newName, oldName) {
		        this.removeClass(obj, oldName);
		        this.addClass(obj, newName);
		    },

		    //获取兄弟节点
		    siblings: function (obj) {
		        var a = [];//定义一个数组，用来存o的兄弟元素
		        var p = obj.previousSibling;
		        while (p) {//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
		            if (p.nodeType === 1) {
		                a.push(p);
		            }
		            p = p.previousSibling//最后把上一个节点赋给p
		        }
		        a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了
		        var n = obj.nextSibling;//再取o的弟弟
		        while (n) {//判断有没有下一个弟弟结点 n是nextSibling的意思
		            if (n.nodeType === 1) {
		                a.push(n);
		            }
		            n = n.nextSibling;
		        }
		        return a;
		    },

		    //设置样式
		    css: function (obj, json) {
		        for (var attr in json) {
		            obj.style[attr] = json[attr];
		        }
		    },

		    //显示隐藏
		    show: function (nodeObj) {
		        nodeObj.style.display = "";
		    },

		    hide: function (nodeObj) {
		        nodeObj.style.display = "none";
		    }
		};	
	

})(window)