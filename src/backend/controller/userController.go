package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
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

	c.JSON(http.StatusOK, gin.H{"token": token, "username": dbUser.Username})
}

func GetUserInfo(c *gin.Context) {
	name := c.DefaultQuery("name", "NaN")
	c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	//WIP
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
