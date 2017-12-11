AjaxPush = function(listener, sender)
{
	this.listener = listener || "";		// the URL will be requested (backend)
	this.sender = sender || "";			// the URL used to send messages
	this.state = false;
	this.timestamp = 0;
}

AjaxPush.prototype = 
{
	connect: function(data, callback)
	{
		inputData = data || {};
		callback = callback || new Function();

		var that = this;

		data["timestamp"] = this.timestamp;

		var status = false;

		this.conn = $.ajax({
			url: this.listener,
			method: 'get',
			dataType: 'json',
			data: data,
			success: function(data)
			{
				if (!that.state)
					console.info("Connected!")

				status = true;
				this.state = true;
				that.timestamp = data["timestamp"];
				callback(data);
			},
			error: function() { console.info('Could not connect!') },
			complete: function(data)
			{
				// send a new ajax request when this request is finished
				if (!status)
				{
					// if a connection proble occurs, try to reconnect each 1 second
					console.info("The connection has been lost!, trying to reconnect ...");

					setTimeout(function(){
						that.connect(inputData, callback);
					}, 1000);

				}
				else
					that.connect(inputData, callback);

				that.state = (data.status == 200) ? true : false;
			}
		});
	},

	doRequest: function(data, callback)
	{
		inputData = data || {};
		callback = callback || new Function();

		var that = this;

		$.ajax({
			url: this.sender,
			method: 'get',
			dataType: 'json',
			data: inputData,
			success: function()
			{
				callback();
			}
		});
	}
}