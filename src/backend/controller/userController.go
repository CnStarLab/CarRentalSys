package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
