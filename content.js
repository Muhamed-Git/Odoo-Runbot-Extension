$(document).ready(function() {
	var data_list = [{
		name: 'danger',
		countAll: true,
		find: true,
		icon: 'fa-times',
		hexCode: '#a94442',
		bgClass: 'bg-danger',
		string: "Errors",
	},{
		name: 'warning',
		countAll: true,
		find: true,
		icon: 'fa-warning',
		hexCode: '#8a6d3b',
		bgClass: 'bg-warning',
		string: "Warnings"
	},{
		name: "success",
		find: false,
		icon: 'fa-thumbs-up',
		hexCode: '#3c763d',
		bgClass: 'bg-success',
		string: "Success"
	}];

	var dataCount = 0;
	_.each(data_list,function(data){
		if(data.find) {
			_.extend(data, {count: 0 , indexes: []}) 
			var result = $('.table-striped tr[class="'+data.name+'"]');
			if(data.countAll){
				data.count =  result.length;
				result.each(function(){
					data.indexes.push({
						single: $(this).index()
					});
				});
			}
			if(data.count) {
				dataCount++;
			}
		}
	});
	
	var mainContainer = $('<div>').addClass('logDashboard');
	mainContainer.appendTo($('body'));

	if(dataCount === 0) {
		var data = _.find(data_list, function(d){ return d.name == "success" });
		var $div = $("<div>").css('color',data.hexCode).addClass(data.bgClass).addClass('dataContainer');
		$div.append($('<i class="fa '+data.icon+'"/>'));
		$div.append( $('<span>').html(data.string).addClass('success'));
		mainContainer.append($div);
	} else {
		var self = this;
		this.position = {};
		this.el = {};
		this.createButtons = function(options) {
			return $("<a>",{
				href: '#',
				click: function(event) {
					self.controllButtons(event,options.op);						
				},
				class: options.class,
				currentIndex: options.currentIndex
			}).html($('<i class="fa '+options.icon+'"/>').addClass('icon'));
		}

		this.controllButtons = function(event,num) {
			this.index = $(event.currentTarget).attr('currentIndex');
			this.name = data_list[this.index].name;
			this.indexes = data_list[this.index].indexes;
			self.position[this.name] += num;
			if(self.position[this.name] === -1) {
				self.position[this.name] = this.indexes.length - 1;
			} else if(self.position[this.name] === this.indexes.length) {
				self.position[this.name] = 0;
			}
			self.el[this.name] ? self.el[this.name].removeClass(this.name+'Focus') : 0;
			self.el[this.name] = $('.table-striped tr').eq(this.indexes[self.position[this.name]].single);
			self.el[this.name].addClass(data_list[this.index].name+'Focus');
			$('html, body').animate({
		        scrollTop: self.el[this.name].offset().top - 50
		    }, 100);
		}

		_.each(data_list,function(data,currentIndex){
			if(data.find && data.count) {
				var $div = $("<div>").css('color',data.hexCode).addClass(data.bgClass).addClass('dataContainer');
				$div.append($('<i class="fa '+data.icon+'"/>').addClass('icon'));
				$div.append( $('<span>').html(data.count).addClass('count'));
				self.position[data.name] = -1; 
				self.el[data.name] = 0; 
				var $next = self.createButtons({
					op: 1,
					class: "next",
					currentIndex: currentIndex,
					icon: "fa-arrow-down"
				});
				var $prev = self.createButtons({
					op: -1,
					class: "prev",
					currentIndex: currentIndex,
					icon: "fa-arrow-up"
				});
				$div.append($next).append($prev);
					mainContainer.append($div);
			}
		});
	}
});
