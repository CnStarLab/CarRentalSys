package routes

import (
	"github.com/gin-gonic/gin"
)

func CarRoutes(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		v1.GET("/cars/getAll", getAll)
	}
}

func getAll(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "ALL CARS",
	})
	//WIP
}
