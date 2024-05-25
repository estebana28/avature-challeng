import './style.css'
import * as pages from './src/pages'
import { Router } from './src/utils/router'
import { PATHS } from './src/utils/routes'

export const router = new Router(PATHS)
