package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CheckHealth(c *gin.Context) {
	c.JSON(http.StatusOK, time.Now())
}
