var width = 400;
		var height = 400;
		var dataset = [ 30 , 10 , 43 , 55 , 13 ];
		
		var svg = d3.select("body")
					.append("svg")
					.attr("width", width)
					.attr("height", height);
		console.log(d3);
        var pie = d3.pie();
        
 
		var piedata = pie(dataset);
		console.log(piedata);
		var outerRadius = 150;	//外半径
		var innerRadius = 5;	//内半径，为0则中间没有空白
 
		var arc = d3.arc()	//弧生成器
					.innerRadius(innerRadius)	//设置内半径
					.outerRadius(outerRadius);	//设置外半径
		
        var color = d3.schemeCategory10;// 饼图每一块的长度
        console.log(color);
		
		var arcs = svg.selectAll("g")//g用于把相关元素进行组合的容器元素
					  .data(piedata)
					  .enter()
					  .append("g")
					  .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
					  
		arcs.append("path")
			.attr("fill",function(d,i){
				return color[i];
			})
			.attr("d",function(d){
				return arc(d);
			});
		
		arcs.append("text")
			.attr("transform",function(d){
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("text-anchor","middle")
			.text(function(d){
				return d.data;
			});
		
