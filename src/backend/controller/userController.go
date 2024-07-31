package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

// @Summary      user login
// @Description  new user to login
// @Tags         user
// @Response     200
// @Router       /api/v1/user/login [GET]
func UserLogin(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//Check user and password.
	var dbUser models.User
	if err := dbUser.FindByEmail(database.DB, user.Email); err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or not register"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		fmt.Println("Database error:", err)
		return
	}

	// Compare the provided password with the stored password
	if !dbUser.ValidatePassword(user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// Genetate Signed JWT
	token, err := user.GenerateToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token, "username": dbUser.Username, "userId": dbUser.ID})
}

func GetUserProfile(c *gin.Context) {
	idParam := c.Param("id")
	userID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var existingUser models.User
	if err := existingUser.FindByID(database.DB, userID); err != nil {
		if errors.Is(err, models.ErrUserNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var profile models.UserProfile
	copier.Copy(&profile, &existingUser)
	c.JSON(http.StatusOK, profile)
}

// @Summary      User Register
// @Description  New user to register
// @Tags         user
// @Param        user body models.User true "User Registration Request"
// @Accept       json
// @Produce      json
// @Success      200 {object} models.User
// @Failure      400 {object} map[string]interface{}
// @Failure      500 {object} map[string]interface{}
// @Router       /api/v1/user/register [post]
func UserRegister(c *gin.Context) {
	var user models.User
	h_err=HashPassword(&user)
	// 绑定 JSON 请求体到 user 对象
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 创建用户
	if err := models.CreateUser(database.DB, &user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}

func UpdateUserProfile(c *gin.Context) {
	var updateUser models.User

	// Bind request with json
	if err := c.ShouldBindJSON(&updateUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get User Id and change to uint64
	idParam := c.Param("id")
	userID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Search existing User
	var existingUser models.User
	if err := existingUser.FindByID(database.DB, userID); err != nil {
		if errors.Is(err, models.ErrUserNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// update
	//existingUser.Username = updateUser.Username	corrently not support change username.
	existingUser.Email = updateUser.Email
	existingUser.Password = updateUser.Password
	existingUser.UserPic = updateUser.UserPic

	if err := database.DB.Save(&existingUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingUser)
}
