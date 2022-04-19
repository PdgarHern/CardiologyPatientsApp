class Users::InvitationsController < Devise::InvitationsController
   

          def create
            logger.info("hola caracola")
            User.invite!(email: params[:email])
            render json: { message: "Invitation sent." }
           
            #super
          end

          def update
            User.accept_invitation!(invitation_token: params[:invitation_token], password: params[:password])
            render json: { message: "Password changed!." }
              #super
            # end
          end
          end