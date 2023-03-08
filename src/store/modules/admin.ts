import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getAdminInfo } from '@/api/admins'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IAdminState {
  token: string
  name: string
  avatar: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'admin' })
class Admin extends VuexModule implements IAdminState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public roles: string[] = []
  public email = ''
  public id = 0

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_ID(id: number) {
    this.id = id
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public async Login(adminInfo: { email: string, password: string }) {
    let { email, password } = adminInfo
    email = email.trim()

    try {
      var data: any = await login({ email, password })
      setToken(data.accessToken)
      this.SET_TOKEN(data.accessToken)
      return await getAdminInfo({})
    } catch (error) {
      this.ResetToken()
      throw new Error(error)
    }
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetAdminInfo() {
    if (this.token === '') {
      throw Error('GetAdminInfo: token is undefined!')
    }
    const data: any = await getAdminInfo({})
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    // // roles must be a non-empty array
    // if (!roles || roles.length <= 0) {
    //   throw Error('GetAdminInfo: roles must be a non-null array!')
    // }
    this.SET_ROLES([data.adminsRole.name])
    this.SET_NAME(data.fullName)
    this.SET_AVATAR(data.avatar ? data.avatar : '')
    this.SET_ID(data.id)
    this.SET_EMAIL(data.email)
    return data
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetAdminInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const AdminModule = getModule(Admin)
