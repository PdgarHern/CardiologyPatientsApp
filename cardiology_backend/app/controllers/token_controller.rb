class TokenController < ApplicationController
    def check_token
        require 'net/http'

        url = URI.parse('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ya29.A0ARrdaM-DsapqgAS8dYH0n6FN6Igo1LvUs5LslD-isl8c7b1cExT-ibs7aQ3Z88TTGHWL2CeZQTMvaJ0o2_6fZQOc7elwGUoyrm1LbtlwfkWImxpOqD4hv7wAj-Gg8OwlcByFYh_YYvX39AOjLNCbhEQijs3N')
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http|
            http.request(req)
        }

        render json: res
    end
end
