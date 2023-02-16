'use strict';

import httpStatusCodes from 'http-status-codes';
import logger from '../logger';
import container from './../boot.js';

function checkUserBelongs (userBelongs) {
  if (!userBelongs) {
    throw new Error();
  }
}

function userBelongsToHotelGroup () {
  return async (req, res, next) => {
    const {
      responses,
      formatter,
      userService,
      httpContext,
    } = container.cradle;
    const { id } = req.params;
    const hotelGroupId = id;
    const user = httpContext.get('user');
    try {
      const userHotelGroups = await userService.getHotelGroups(user._id);
      const userBelongs = !!userHotelGroups.find(hotelGroup => hotelGroup._id === hotelGroupId);
      checkUserBelongs(userBelongs);
      next();
    }  catch (err){
      logger.error(err);
      res.status(httpStatusCodes.UNAUTHORIZED).json(responses(undefined, formatter.requestEntity(req)));
      // TODO
      // req.path.includes('/api/') && trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: {
      //     kpiId: 51003,
      //     description: err.message,
      //   }
      // });
    }
  };
}

async function userBelongsToHotel () {
  return async (req, res, next) => {
    const {
      responses,
      formatter,
      userService,
    } = container.cradle;
    console.log(req);
    try {
      const userHotels = await userService.getHotels(userId);
      const userBelongs = !!userHotels.find(hotel => hotel._id === hotelId);
      checkUserBelongs(userBelongs);
      next();
    }  catch (err){
      logger.error(err);
      res.status(httpStatusCodes.UNAUTHORIZED).json(responses(undefined, formatter.requestEntity(req)));
      // TODO
      // req.path.includes('/api/') && trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: {
      //     kpiId: 51003,
      //     description: err.message,
      //   }
      // });
    }
  };
}

async function userBelongsToRoomType () {
  return async (req, res, next) => {
    const {
      responses,
      formatter,
      userService,
    } = container.cradle;
    console.log(req);
    try {
      const userHotels = await userService.getHotels(userId);
      const userBelongs = !!userHotels.find(hotel => hotel._id === hotelId);
      checkUserBelongs(userBelongs);
      next();
    }  catch (err){
      logger.error(err);
      res.status(httpStatusCodes.UNAUTHORIZED).json(responses(undefined, formatter.requestEntity(req)));
      // TODO
      // req.path.includes('/api/') && trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: {
      //     kpiId: 51003,
      //     description: err.message,
      //   }
      // });
    }
  };
}

export { userBelongsToHotelGroup, userBelongsToHotel, userBelongsToRoomType };
