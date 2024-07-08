package routes

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		v1.GET("/login", userLogin)
		v1.GET("/getUserInfo", getUserInfo)
	}
}

func userLogin(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
	//WIP
}

func getUserInfo(c *gin.Context) {
	name := c.DefaultQuery("name", "NaN")
	c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	//WIP
}
