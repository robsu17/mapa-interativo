import { getTenants } from '@/api/get-tenants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useTenantStore } from '@/store/tenant'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Página inicial', href: '/' },
  { name: 'Produtos', href: '/products' },
]

export function Navigation() {
  const { pathname } = useLocation()

  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tentants'],
    queryFn: getTenants,
  })

  const changeTenant = useTenantStore((state) => state.changeTenant)

  useEffect(() => {
    if (tenants) {
      changeTenant(tenants[0].uuid)
    }
  }, [changeTenant, isLoading, tenants])

  return (
    <ul role="list" className="-mx-2 space-y-1">
      <div className="mb-10">
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Select
            defaultValue={tenants && tenants[0].uuid}
            onValueChange={(value) => changeTenant(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tenants &&
                tenants.map((tenant) => {
                  return (
                    <SelectItem key={tenant.id} value={tenant.uuid}>
                      {tenant.displayName}
                    </SelectItem>
                  )
                })}
            </SelectContent>
          </Select>
        )}
      </div>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            data-current={pathname === item.href}
            to={item.href}
            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-gray-800 hover:text-white data-[current=true]:bg-gray-800 data-[current=false]:text-gray-400"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
