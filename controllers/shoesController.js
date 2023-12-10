import Shoe from '../models/Shoe.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc      Get all shoes
// @route     GET /api/v1/shoes
// @access    Public
export const getAllShoes = asyncHandler(async (req, res, next) => {
  try {
    // Make sure to import the 'Shoe' model
    const shoes = await Shoe.find();

    console.log('shoes', shoes);

    return res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching shoes:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});
// @desc      Get single shoe
// @route     GET /api/v1/shoes/:id
// @access    Public
export const getShoe = asyncHandler(async (req, res, next) => {
  const shoe = await Shoe.findById(req.params.id);

  if (!shoe) {
    return next(
      new ErrorResponse(
        `Shoe that ends with '${req.params.id.slice(-6)}' was not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: shoe,
  });
});

// @desc      Add a shoe
// @route     POST /api/v1/shoes
// @access    Private
export const addShoe = asyncHandler(async (req, res, next) => {
  let shoe = await Shoe.create(req.body);

  res.status(200).json({
    success: true,
    data: shoe,
  });
});

// @desc      Update a shoe
// @route     PUT /api/v1/shoes/:id

// @desc      Update a shoe
// @route     PUT /api/v1/shoes/:id
export const updateShoe = asyncHandler(async (req, res, next) => {
  // Check if the shoe exists
  let shoe = await Shoe.findById(req.params.id);

  if (!shoe) {
    return next(
      new ErrorResponse(
        `Shoe with ID '${req.params.id}' was not found`,
        404
      )
    );
  }

  // Update the shoe
  // Note: Use save() instead of findByIdAndUpdate to trigger middleware
  Object.assign(shoe, req.body);
  await shoe.save();

  res.status(200).json({
    success: true,
    data: shoe,
  });
});




// export const updateShoe = asyncHandler(async (req, res, next) => {
//   let shoe = await Shoe.findById(req.params.id);

//   if (!shoe) {
//     return next(
//       new ErrorResponse(
//         `Shoe that ends with '${req.params.id.slice(-6)}' was not found`,
//         404
//       )
//     );
//   }

  // if (req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User with ID that ends with '${req.user.id.slice(
  //         -6
  //       )}' is not authorized to update this shoe`,
  //       401
  //     )
  //   );
  // }

//   shoe = await Shoe.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     data: shoe,
//   });
// });






// @desc      Delete a shoe
// @route     Delete /api/v1/shoes/:id
// @access    Private

export const deleteShoe = asyncHandler(async (req, res, next) => {
  // Find the shoe by ID
  const shoe = await Shoe.findById(req.params.id);

  // Check if the shoe exists
  if (!shoe) {
    return next(
      new ErrorResponse(`Shoe with ID '${req.params.id}' not found`, 404)
    );
  }

  // Delete the shoe
  await shoe.deleteOne();

  // Send a success response
  res.status(200).json({
    success: true,
    data: {},
  });
});



// export const deleteShoe = asyncHandler(async (req, res, next) => {
//   const shoe = await Shoe.findById(req.params.id);

//   if (!shoe) {
//     return next(
//       new ErrorResponse(
//         `Shoe that ends with '${req.params.id.slice(-6)}' was not found`,
//         404
//       )
//     );
//   }

//     {
//     return next(
//       new ErrorResponse(
//         `User with ID that ends with '${req.user.id.slice(
//           -6
//         )}' is not authorized to delete this shoe`,
//         401
//       )
//     );
//   }

//   await shoe.deleteOne();

//   res.status(200).json({
//     success: true,
//     data: {},
//   });
// });

  // if (req.user.role !== 'admin') {
