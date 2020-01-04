var BaseService = require('./BaseService');

class VendorService extends BaseService {

    async Vendor_Profile_Update(editedProfileData, id, callback) {
        try {
            domain.Vendor.findOneAndUpdate({
                _id: id
            }, editedProfileData, {
                    new: true
                }, (error, result) => {
                    if (error) {
                        callback(error, null)
                    } else {
                        callback(null, result)
                    }
                });
        } catch (e) {
            callback(null, {
                "error": "error while saving"
            })
        }
    }

    getAll_Vendors(params, callback) {
        console.log(params,"params")
        domain.Vendor.find({
            isApproved: params.isApproved
        }, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        });
    }
}





module.exports = function (app) {
    return new VendorService(app);
};