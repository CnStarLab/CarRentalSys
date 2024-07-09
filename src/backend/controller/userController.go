package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      user login
// @Description  new user to login
// @Tags         user
// @Response     200
// @Router       /api/v1/user/login [GET]
func UserLogin(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
	//WIP
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
