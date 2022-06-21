const { success, error } = require("../utils/restResponse");
const constants = require("../config/constants");
const env = require("../config/env");
const common = require("./common.controller");
const e = require("express");
const { unitCalculator } = require("../utils/calculator")

exports.total = (req, res) => {
	try {
		DB.query(
			"select COUNT(id) from bm_bloom_category where is_active = '1' ",
			function (err, totalBloomCategory) {
				if (err) {
					console.log(err);
					return res.send(error(constants.SERVER_ERROR));
				}
				totalBloomCategory = totalBloomCategory[0]["COUNT(id)"]
				DB.query(
					"select COUNT(id) from bm_bloom_category_detail where deleted_at is null ",
					function (err, totalBloom) {
						if (err) {
							console.log(err);
							return res.send(error(constants.SERVER_ERROR));
						}
						totalBloom = totalBloom[0]["COUNT(id)"]

						DB.query(
							"select COUNT(id) from bm_challenge_category where deleted_at is null and ID NOT IN (1) ",
							function (err, totalChallangeCategory) {
								if (err) {
									console.log(err);
									return res.send(error(constants.SERVER_ERROR));
								}
								totalChallangeCategory = totalChallangeCategory[0]["COUNT(id)"]

								DB.query(
									"select COUNT(id) from bm_challenge_category_detail where  deleted_at is null ",
									function (err, totalChallanges) {
										if (err) {
											console.log(err);
											return res.send(error(constants.SERVER_ERROR));
										}
										totalChallanges = totalChallanges[0]["COUNT(id)"]

										DB.query(
											"select COUNT(id) from bm_posts where deleted_at is null  ",
											function (err, totalPosts) {
												if (err) {
													console.log(err);
													return res.send(error(constants.SERVER_ERROR));
												}
												totalPosts = totalPosts[0]["COUNT(id)"]

												DB.query(
													"select COUNT(id) from bm_rewards where is_active = '1' ",
													function (err, totalRewards) {
														if (err) {
															console.log(err);
															return res.send(error(constants.SERVER_ERROR));
														}
														totalRewards = totalRewards[0]["COUNT(id)"]

														DB.query(
															"select COUNT(id) from bm_users where is_active = '1' ",
															function (err, totalUsers) {
																if (err) {
																	console.log(err);
																	return res.send(
																		error(constants.SERVER_ERROR)
																	);
																}
																totalUsers = totalUsers[0]["COUNT(id)"]

																DB.query(
																	"select COUNT(id) from bm_vendors where is_active = '1' ",
																	function (err, totalVendors) {
																		if (err) {
																			console.log(err);
																			return res.send(
																				error(constants.SERVER_ERROR)
																			);
																		}
																		totalVendors = totalVendors[0]["COUNT(id)"]

																		DB.query(
																			"select COUNT(id) from bm_reward_category where is_active = '1' and ID NOT IN (1) ",
																			function (err, totalRewardCategory) {
																				if (err) {
																					console.log(err);
																					return res.send(
																						error(constants.SERVER_ERROR)
																					);
																				}
																				totalRewardCategory = totalRewardCategory[0]["COUNT(id)"]

																				DB.query(
																					"select COUNT(id) from reported_posts ",
																					function (err, totalReport) {
																						if (err) {
																							console.log(err);
																							return res.send(
																								error(constants.SERVER_ERROR)
																							);
																						}
																						totalReport = totalReport[0]["COUNT(id)"]

																						return res.send(
																							success(
																								{
																									totalVendors,
																									totalBloomCategory,
																									totalBloom,
																									totalChallangeCategory,
																									totalChallanges,
																									totalPosts,
																									totalRewards,
																									totalUsers,
																									totalRewardCategory,
																									totalReport
																								},
																								"total count fetched"
																							)
																						);
																					}
																				);
																			}
																		);
																	}
																);
															}
														);
													}
												);
											}
										);
									}
								);
							}
						);
					}
				);
			}
		);
	} catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	}
};


exports.bloomCount = (req, res) => {
	try {
		DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 1', async function (err, energyTotalCount) {
			if (err) {
				console.log(err);
				return res.send(error(constants.SERVER_ERROR));
			}
			energyTotalCount = energyTotalCount[0]["Energy"]
			DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 2', async function (err, fuelTotalCount) {
				if (err) {
					console.log(err);
					return res.send(error(constants.SERVER_ERROR));
				}
				fuelTotalCount = fuelTotalCount[0]["Energy"]
				DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 3', async function (err, homeTotalCount) {
					if (err) {
						console.log(err);
						return res.send(error(constants.SERVER_ERROR));
					}
					homeTotalCount = homeTotalCount[0]["Energy"]
					DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 4', async function (err, kidsTotalCount) {
						if (err) {
							console.log(err);
							return res.send(error(constants.SERVER_ERROR));
						}
						kidsTotalCount = kidsTotalCount[0]["Energy"]
						DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 5', async function (err, recycleTotalCount) {
							if (err) {
								console.log(err);
								return res.send(error(constants.SERVER_ERROR));
							}
							recycleTotalCount = recycleTotalCount[0]["Energy"]
							DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 6', async function (err, treesTotalCount) {
								if (err) {
									console.log(err);
									return res.send(error(constants.SERVER_ERROR));
								}
								treesTotalCount = treesTotalCount[0]["Energy"]
								DB.query('SELECT COUNT(bloom_category_id) AS Energy FROM bm_bloom_category_detail WHERE bloom_category_id = 7', async function (err, waterTotalCount) {
									if (err) {
										console.log(err);
										return res.send(error(constants.SERVER_ERROR));
									}
									waterTotalCount = waterTotalCount[0]["Energy"]

									return res.send(success({
										energyTotalCount,
										fuelTotalCount,
										homeTotalCount,
										kidsTotalCount,
										recycleTotalCount,
										treesTotalCount,
										waterTotalCount
									}, "Okay"));
								});
							});
						});
					});
				});
			});
		});
	} catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	}
}




exports.bloomUnitActiveTotalCount = (req, res) => {

	let userId;

	req.query.user_id ?
		userId = req.query.user_id :
		userId = req.user_id

	try {
		DB.query('SELECT ROUND(SUM(co2),2) as co2 ,ROUND(SUM(kwh),2) as kwh ,ROUND(SUM(water),2) as water ,ROUND(SUM(waste_recycle),2) as waste_recycle ,ROUND(SUM(no_of_tree),2) as no_of_tree ,ROUND(SUM(badge_green),2) as badge_green ,ROUND(SUM(badge_ev),2) as badge_ev ,ROUND(SUM(badge_solar),2) as badge_solar ,user_id FROM `bloom_results` WHERE user_id = ?', [userId], async function (err, unitCount) {
			if (err) {
				console.log(err);
				return res.send(error(constants.SERVER_ERROR));
			} DB.query("select * from bm_impact order by id asc", async function (err, impactImages) {
				if (err) {
					console.log(err);
					return res.send(error(constants.SERVER_ERROR));
				}

				const unitCalc = unitCalculator(unitCount, impactImages)
				const sumResult = unitCalc.sumResult
				const badgeResult = unitCalc.badgeResult
				DB.query("SELECT COUNT(bm_bloom_category_detail.id) as Total,bm_bloom_category_detail.bloom_category_id , bm_bloom_category.name FROM `bm_bloom_category_detail` JOIN bm_bloom_category ON bm_bloom_category.id = bm_bloom_category_detail.bloom_category_id GROUP BY bm_bloom_category_detail.bloom_category_id ", async function (err, total) {
					if (err) {
						console.log(err);
						return res.send(error(constants.SERVER_ERROR));
					}
					const total_active = [];
					total.map(async (e, i, a) => {
						let id = e.bloom_category_id

						await DB.query('SELECT COUNT( bloom_category_detail_id) as Active,bloom_category_id FROM user_bloom_category WHERE user_id = ? AND bloom_category_id = ?', [userId, id], async function (err, active) {
							if (err) {
								console.log(err);
								return res.send(error(constants.SERVER_ERROR));
							}
							active = active[0]["Active"]
							total_active.push({ Active: active, Total: a[i]["Total"], bloom_category_id: e.bloom_category_id, Name: e.name })

							if (total_active.length === a.length) {
								return res.send(success({ total_active, sumResult, badgeResult }, "Okay"));
							}
						});
					});
				});
			})
		})
	}
	catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	};
}

exports.notificationCount = (req, res) => {
	try {
		DB.query("SELECT COUNT(id) as notification FROM `bm_notifications` WHERE user_id = ? and seen = 0", req.user_id, function (err, result, fields) {
			if (err) {
				console.log(err);
				return res.send(error(constants.SERVER_ERROR));
			}
			return res.send(success(result, `Total Notification Count is ${result[0]['notification']}`));
		});
	} catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	}
}

exports.getNotificationById = (req, res) => {
	const id = req.params.id;
	try {
		let sql = "UPDATE bm_notifications SET `seen`= ?  WHERE id = ?";

		DB.query(sql, [1, id], (err, result) => {
			if (err) {
				console.log(err);
				return res.send(error(constants.SERVER_ERROR));
			}
			return res.send(success(result, "You have seen notification!!!!"));
		});
	} catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	}
}


exports.getNotificationStatus = (req, res) => {
	try {
		const userId = req.user_id;

		let sql = "SELECT like_notification_status,	comment_notification_status,	follower_request_on_off,	accept_follow_req_notification_on_off FROM `bm_notification_on_off` WHERE user_id = ? ";

		DB.query(sql, [userId], (err, result) => {
			if (err) {
				console.log(err);
				return res.send(error(constants.SERVER_ERROR));
			}
			if(result.length){
			return res.send(success(result[0], "Notification Status!!!!"));
		} else{
			const temp = {like_notification_status: 0,
            comment_notification_status: 0,
            follower_request_on_off: 0,
            accept_follow_req_notification_on_off:0}
			return res.send(success(temp, "Notification Status!!!!"));

		}
		});
	} catch (e) {
		console.log(e);
		return res.send(error(constants.SERVER_ERROR));
	}
}