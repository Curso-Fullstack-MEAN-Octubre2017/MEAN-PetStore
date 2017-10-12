

module.exports = {
	/**
	 * Devuelve una array {id: ..., label:  ...]
	 */
	asIdLabelList : function(list, labelProperty) {
		var results = [];
		for (var i = 0; i < list.length; i++) {
			results.push({id: list[i]._id, label: list[i][labelProperty]});
		}
		return results;
	}
}