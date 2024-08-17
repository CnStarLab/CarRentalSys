package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
)

// @Summary Book a new car
// @Description Book a new car for rental
// @Tags Service
// @Accept json
// @Produce json
// @Param rentRequest body models.UserCar true "Rent request details"
// @Success 200 {object} map[string]interface{} "Car rented successfully"
// @Failure 400 {string} string "Bad request"
// @Failure 404 {string} string "User not found"
// @Failure 404 {string} string "Car not found"
// @Failure 400 {string} string "Car is not available"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/user/bookCar [post]
func BookNewCar(c *gin.Context) {
	//1.Get Current User
	var currUser models.User
	currUserID, userExist := c.Get("ID")
	if !userExist {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Auth middleware bugs!"})
		return
	}
	currUser.ID = currUserID.(uint) //assert into uint

	var rentRequest models.UserCar
	if err := c.ShouldBindJSON(&rentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := models.BookCar(database.DB, rentRequest.UserId, rentRequest.CarID, rentRequest.StartTime, rentRequest.EndTime, rentRequest.Reason)
	if err != nil {
		switch err {
		case models.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		case models.ErrCarNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		case models.ErrCarNotAvailable:
			c.JSON(http.StatusBadRequest, gin.H{"error": "Car is not available"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car rented successfully", "bookId": id})
}

// @Summary Return a car
// @Description Return a rented car
// @Tags Service
// @Accept json
// @Produce json
// @Param returnRequest body models.UserCar true "Return request details"
// @Success 200 {object} map[string]string "Car rented successfully"
// @Failure 400 {string} string "Bad request"
// @Failure 404 {string} string "User not found"
// @Failure 404 {string} string "Car not found"
// @Failure 400 {string} string "Relation between User and Car not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/user/returnCar [post]
func ReturnCar(c *gin.Context) {
	var returnRequest models.UserCar
	if err := c.ShouldBindJSON(&returnRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.ReturnCar(database.DB, returnRequest.UserId, returnRequest.CarID)
	if err != nil {
		switch err {
		case models.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		case models.ErrCarNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		case models.ErrUserCarNotFound:
			c.JSON(http.StatusBadRequest, gin.H{"error": "Realation between User and Car not found"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car rented successfully"})
}

// @Summary Approve a booking request
// @Description Approve a booking request by car owner
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]string "Request approved successfully"
// @Failure 400 {string} string "Invalid Book ID"
// @Failure 404 {string} string "UserCar not found"
// @Failure 400 {string} string "Not A Pending Request!"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/status/approve/{id} [post]
func ApproveBookRequest(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Book ID"})
		return
	}

	//get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookInfoByBookId(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if currRequest.Status != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not A Pending Request!"})
		return
	}

	// do update status
	if err := currRequest.UpdateStatus(database.DB, 1); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//[WIP] email/sms service notice user
	c.JSON(http.StatusOK, gin.H{"message": "Request approved successfully"})
}

// @Summary Decline a booking request
// @Description Decline a booking request by car owner
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]string "Request declined and deleted successfully"
// @Failure 400 {string} string "Invalid Book ID"
// @Failure 404 {string} string "UserCar not found"
// @Failure 400 {string} string "Not A Pending Request!"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/status/decline/{id} [post]
func DeclineBookRequest(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Book ID"})
		return
	}

	// Get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookInfoByBookId(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if currRequest.Status != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not A Pending Request!"})
		return
	}

	// Delete the request from the database
	if err := currRequest.Delete(database.DB); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//[WIP] email/sms service notice user
	c.JSON(http.StatusOK, gin.H{"message": "Request declined and deleted successfully"})
}

// @Summary User decline a booking request
// @Description User decline a booking request
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} map[string]string "Request declined and deleted successfully"
// @Failure 400 {string} string "Invalid Book ID"
// @Failure 404 {string} string "UserCar not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/user/status/decline/{id} [post]
func UserDeclineBookRequest(c *gin.Context) {
	//User side API
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Book ID"})
		return
	}

	// Get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookInfoByBookId(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Delete the request from the database
	if err := currRequest.Delete(database.DB); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//[WIP] email/sms service notice user
	c.JSON(http.StatusOK, gin.H{"message": "Request declined and deleted successfully"})
}

// @Summary Get booking info by bookId
// @Description Get booking information by bookId
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "Booking ID"
// @Success 200 {object} models.UserCar
// @Failure 400 {string} string "Invalid car ID"
// @Failure 404 {string} string "UserCar not found"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/info/bookId/{id} [get]
func GetBookInfoByBookId(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	//get book info
	var currBookInfo models.UserCar
	currBookInfo, err = models.FindBookInfoByBookId(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, currBookInfo)
}

// @Summary Get booking info by ownerId
// @Description Get booking information by ownerId
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "Owner ID"
// @Success 200 {object} models.CarsBookInfo
// @Failure 400 {string} string "Invalid Owner ID"
// @Failure 500 {string} string "Failed To Find Your Cars!"
// @Router /api/v1/service/info/ownerId/{id} [get]
func GetBookInfoByOwnerId(c *gin.Context) {
	var ownerCarsInfo models.CarsBookInfo
	idParam := c.Param("id")
	OwnerId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Owner ID"})
		return
	}

	var myCars models.Cars
	err = myCars.FindByOwnerID(database.DB, OwnerId)
	if err != nil {
		c.JSON(http.StatusAccepted, gin.H{"error": "Failed To Find Your Cars!"})
		return
	}
	//emprty slice
	if len(myCars) == 0 {
		c.JSON(http.StatusAccepted, gin.H{"error": "You Have No Order Yet!"})
		return
	}

	copier.Copy(&ownerCarsInfo, &myCars)

	c.JSON(http.StatusOK, ownerCarsInfo)
}

// @Summary Get booking info by userId
// @Description Get booking information by userId
// @Tags Service
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} models.Logs
// @Failure 400 {string} string "Invalid User ID"
// @Failure 500 {string} string "Internal server error"
// @Router /api/v1/service/info/userId/{id} [get]
func GetBookInfoByUserId(c *gin.Context) {
	var userOrder models.Logs
	idParam := c.Param("id")
	userId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	err = userOrder.FindBookInfoByUserId(database.DB, userId)
	if err != nil {
		c.JSON(http.StatusAccepted, gin.H{"error": err.Error()})
		return
	}
	//emprty slice
	// if len(userOrder) == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "You Have No Car Registered For Renting Yet!"})
	// 	return
	// }

	//copier.Copy(&ownerCarsInfo, &myCars)

	c.JSON(http.StatusOK, userOrder)
}
