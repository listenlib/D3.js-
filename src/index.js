//画布大小
	var width = 400;
	var height = 400;
	//在 body 里添加一个 SVG 画布	
	var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	//画布周边的空白
	var padding = {left:30, right:30, top:20, bottom:20};

	//定义一个数组
    var dataset = [10, 20, 30, 40, 33, 24, 12, 5];
    
	//x轴的比例尺
	var xScale = d3.scaleBand() // 创建序数段比例尺
    .domain(d3.range(dataset.length)) // 设置输入的定义域。
    .rangeRound([0, width - padding.left - padding.right]); // 设置输出的值域并取整

	//y轴的比例尺
	var yScale =  d3.scaleLinear() // 创建定量线性比例尺
		.domain([0,d3.max(dataset)]) // 设置输入的定义域。
        .range([height - padding.top - padding.bottom, 0]); // 设置输出的值域
        
	//定义x轴
	var xAxis =d3.axisBottom(xScale); // d3.axisBottom：创建一个底部轴生成器。
		
	//定义y轴
    var yAxis = d3.axisLeft(yScale); // d3.axisLeft：创建一个左部轴生成器。
    
    //添加x轴
	svg.append("g")  // 这一步请看svg相关知识
    .attr("class","axis")
    .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis); 
    
   //添加y轴
   svg.append("g")
    .attr("class","axis")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis);


	//矩形之间的空白
	var rectPadding = 4;

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
            return xScale(i) + rectPadding/2;  // 开始画矩形右上角的x坐标
           
		} )
		.attr("y",function(d){
			return yScale(d); // 开始画矩形右上角的y坐标
		})
		.attr("width", xScale.bandwidth()- rectPadding )  // 矩形的宽
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d); // 矩形的高
		});

	//添加文字元素
	var texts = svg.selectAll(".MyText")
		.data(dataset)
		.enter()
		.append("text")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("dx",function(){
			return (xScale.bandwidth () - rectPadding)/2;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d;
		});

	