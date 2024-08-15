package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// @Summary Create a new car by user
// @Description Add a new car for renting from a user
// @Tags Car
// @Accept json
// @Produce json
// @Param car body models.Car true "Car information"
// @Success 201 {object} models.Car
// @Failure 400 {string} string "Bad request"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/info/createCarBasic [post]
func CreateCarsByUser(c *gin.Context) {
	var car models.Car

	// Bind JSON string to struct.
	if err := c.ShouldBindJSON(&car); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create cars in models.
	if err := models.CreateCarByUser(database.DB, &car); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, car)
}

// @Summary Update car information
// @Description Update car information by carId
// @Tags Car
// @Accept json
// @Produce json
// @Param id path int true "Car ID"
// @Param car body models.Car true "Car information to update"
// @Success 200 {object} models.Car
// @Failure 400 {string} string "Invalid car ID"
// @Failure 404 {string} string "Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/info/update/{id} [post]
func UpdateCarInfo(c *gin.Context) {
	var updateCar models.Car
	// Bind request with json
	if err := c.ShouldBindJSON(&updateCar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get User Id and change to uint64
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	// Search existing Car
	var existingCar models.Car
	if err := existingCar.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// update
	existingCar.CarPics = updateCar.CarPics

	if err := database.DB.Save(&existingCar).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCar)
}

// @Summary Get all cars
// @Description Get all cars information from the `Car` table
// @Tags Car
// @Accept json
// @Produce json
// @Success 200 {array} models.Car
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/all [get]
func GetAllCars(c *gin.Context) {
	var cars []models.Car
	result := database.DB.Preload("CarPics").Find(&cars)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, cars)
}

// @Summary Get car by carId
// @Description Get car information by carId
// @Tags Car
// @Accept json
// @Produce json
// @Param id path int true "Car ID"
// @Success 200 {object} models.Car
// @Failure 400 {string} string "Invalid car ID"
// @Failure 404 {string} string "Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/carId/{id} [post]
func GetCarByCarId(c *gin.Context) {
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	var existingCarInfo models.Car
	if err := existingCarInfo.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCarInfo)
}

// @Summary Get cars by ownerId
// @Description Get cars information by ownerId
// @Tags Car
// @Accept json
// @Produce json
// @Param id path int true "Owner ID"
// @Success 200 {array} models.Car
// @Failure 400 {string} string "Invalid Owner ID"
// @Failure 404 {string} string "Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/ownerId/{id} [get]
func GetCarByOwnerId(c *gin.Context) {
	idParam := c.Param("id")
	ownerID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Owner ID"})
		return
	}

	var existingCarsInfo models.Cars
	if err := existingCarsInfo.FindByOwnerID(database.DB, ownerID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCarsInfo)
}

// @Summary Get cars with conditions
// @Description Get cars information with specified conditions
// @Tags Car
// @Accept json
// @Produce json
// @Param minPrice query int false "Minimum price"
// @Param maxPrice query int false "Maximum price"
// @Param brand query string false "Brand"
// @Param location query string false "Location"
// @Param carType query string false "Car type"
// @Param supportDriver query string false "Support driver"
// @Param supportDelivery query string false "Support delivery"
// @Param startTime query string false "Start time (RFC3339 format)"
// @Param endTime query string false "End time (RFC3339 format)"
// @Success 200 {array} models.Car
// @Failure 400 {string} string "Invalid start date format"
// @Failure 400 {string} string "Invalid end date format"
// @Failure 400 {string} string "Bad request"
// @Router /api/v1/cars [get]
func GetCarsWithConds(c *gin.Context) {
	var currParams models.CarQueryParams

	minPrice, err := strconv.ParseInt(c.Query("minPrice"), 10, 64)
	if err == nil {
		currParams.MinPrice = minPrice
	}

	maxPrice, err := strconv.ParseInt(c.Query("maxPrice"), 10, 64)
	if err == nil {
		currParams.MaxPrice = maxPrice
	}

	currParams.Brand = c.Query("brand")
	currParams.Location = c.Query("location")
	currParams.CarType = c.Query("carType")
	currParams.SupportDriver = c.Query("supportDriver")
	currParams.SupportDelivery = c.Query("supportDelivery")

	if st := c.Query("startTime"); st != "" {
		startTime, err := time.Parse(time.RFC3339, st)
		if err == nil {
			currParams.StartTime = startTime
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
			return
		}
	}

	if et := c.Query("endTime"); et != "" {
		endTime, err := time.Parse(time.RFC3339, et)
		if err == nil {
			currParams.EndTime = endTime
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
			return
		}
	}

	var resultCars models.Cars
	if err := resultCars.FindByConds(database.DB, &currParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, resultCars)
}

// @Summary Get car invalid date range
// @Description Get a car's invalid date range
// @Tags Car
// @Accept json
// @Produce json
// @Param id path int true "Car ID"
// @Success 200 {array} map[string]interface{}
// @Failure 400 {string} string "Invalid Car ID"
// @Failure 404 {string} string "Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/invalidDate/{id} [get]

func GetCarInvalidDate(c *gin.Context) {
	//get parama and trans 2 unsigned int
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Car ID"})
		return
	}

	//Search the car by carId
	var targetCar models.Car
	if err := targetCar.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Put the member we want into new structure
	var result []map[string]interface{}
	for _, userCar := range targetCar.UsingLogs {
		result = append(result, map[string]interface{}{
			"id":        userCar.ID,
			"startTime": userCar.StartTime,
			"endTime":   userCar.EndTime,
		})
	}

	c.JSON(http.StatusOK, result)
}

// @Summary Set car availability by owner
// @Description Set the availability status of a car by its owner
// @Tags Car
// @Accept json
// @Produce json
// @Param request body SetCarAvailRequest true "Set car availability request"
// @Success 200 {object} map[string]interface{} "Car availability updated successfully"
// @Failure 400 {string} string "Invalid request"
// @Failure 404 {string} string "Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/cars/setAvail [post]
func SetCarAvailByOwner(c *gin.Context) {
	var currRequest models.SetCarAvailRequest
	if err := c.ShouldBindJSON(&currRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var targetCar models.Car
	if err := targetCar.SetAvail(database.DB, currRequest.CarID, *currRequest.Available); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car availability updated successfully"})
}
