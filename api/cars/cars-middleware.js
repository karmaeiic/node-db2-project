const vinValidator = require('vin-validator')

const {
  getById,
  getByVin
} = require('./cars-model.js')



function checkCarID() {
	return (req, res, next) => {
		users.findById(req.params.id)
			.then((cars) => {
				if (cars) {
					req.cars = cars // make user available to later middleware functions
					next()
				} else {
					res.status(404).json({
						message: "Car not found",
					})
				}
			})
			.catch((error) => {
				console.log(error)
				res.status(500).json({
					message: "Error retrieving the car",
				})
			})
	}
}

const checkCarPayload = (req, res, next) => {
 
}

const checkVinNumberValid = (req, res, next) => {
    vinValidator.validate(req.newCar.vin)
    ? next()
    : res.status(400).json({ message: `vin ${req.newCar.vin} is invalid` })
}

const checkVinNumberUnique = (req, res, next) => {
  const matching = await getByVin(req.newCar.vin)
  matching.length === 0
    ? next()
    : res.status(400).json({ message: `vin ${req.newCar.vin} already exists`})
}

module.exports = {
	checkCarID,
	checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}