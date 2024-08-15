import List from '@/components/common/list/list'
import ListExternalLink from '@/components/common/list/listExternalLink/listExternalLink'
import ListItem from '@/components/common/list/listItem/listItem'
import ListLink from '@/components/common/list/listLink/listLink'

const ListComponentDemo = () => {
  return (
    <div className="px-4 2xl:container">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 flex items-center">
          <List>
            <ListItem>
              <ListLink href={'/'}>Home</ListLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://google.come">
                Google
              </ListExternalLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://facebook.come">
                Facebook
              </ListExternalLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://youtube.come">
                Youtube
              </ListExternalLink>
            </ListItem>
          </List>
        </div>
        <div className="col-span-12 sm:col-span-6 flex items-center justify-end">
          <List>
            <ListItem>
              <ListExternalLink target="_blank" href="http://google.come" className="block text-white hover:text-cyan-300">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.795 17.3772L9.72995 19.3862C9.37195 19.7342 8.77295 19.5802 8.62795 19.1022L7.25195 14.5722"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1041 11.3982C14.1041 11.3982 11.5151 13.7342 10.1871 14.9332C9.79008 15.2912 9.82308 15.9212 10.2531 16.2382L15.6311 20.2112C16.1601 20.6022 16.9161 20.3152 17.0531 19.6712L19.6941 7.22418C19.8221 6.62218 19.2311 6.11918 18.6571 6.34018L3.14208 12.3242C2.68508 12.5002 2.70708 13.1532 3.17408 13.2992L7.25108 14.5712"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </ListExternalLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://google.come" className="block text-white hover:text-cyan-300">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 7.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 7.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.707 13.793L16.293 17.207C16.105 17.395 15.851 17.5 15.586 17.5H12L8 21.5V17.5H5C4.448 17.5 4 17.052 4 16.5V7.914C4 7.649 4.105 7.394 4.293 7.207L7.707 3.793C7.895 3.605 8.149 3.5 8.414 3.5H19C19.552 3.5 20 3.948 20 4.5V13.086C20 13.351 19.895 13.605 19.707 13.793Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </ListExternalLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://google.come" className="block text-white hover:text-cyan-300">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.95 9.84998C19.95 9.43576 19.6142 9.09998 19.2 9.09998C18.7858 9.09998 18.45 9.43576 18.45 9.84998H19.95ZM3.60565 16.6076C3.36134 16.2731 2.89213 16.2 2.55764 16.4443C2.22314 16.6886 2.15004 17.1578 2.39435 17.4923L3.60565 16.6076ZM2.87257 16.3109C2.46438 16.3813 2.19053 16.7692 2.2609 17.1774C2.33128 17.5856 2.71924 17.8594 3.12743 17.7891L2.87257 16.3109ZM5.7 16.15L5.93829 16.8611C6.18386 16.7788 6.36961 16.5757 6.4296 16.3237C6.4896 16.0718 6.41535 15.8067 6.23322 15.6225L5.7 16.15ZM4.8 5.34998L5.46058 4.99482C5.33797 4.76676 5.10639 4.61808 4.84798 4.60151C4.58958 4.58495 4.34091 4.70284 4.19018 4.91337L4.8 5.34998ZM10.2 9.84998L10.0229 10.5788C10.2422 10.6321 10.4739 10.5837 10.6537 10.4472C10.8334 10.3106 10.9421 10.1004 10.9496 9.87477L10.2 9.84998ZM18.3 7.14998L17.6738 7.56275C17.8126 7.77327 18.0479 7.89998 18.3 7.89998V7.14998ZM21 7.14998L21.624 7.566C21.7775 7.33586 21.7918 7.03995 21.6613 6.79608C21.5307 6.55221 21.2766 6.39998 21 6.39998V7.14998ZM18.576 9.43395C18.3462 9.7786 18.4393 10.2442 18.784 10.474C19.1286 10.7038 19.5943 10.6106 19.824 10.266L18.576 9.43395ZM18.45 9.84998C18.45 12.8619 17.5901 15.371 16.0501 17.1163C14.5204 18.8499 12.2593 19.9 9.3 19.9V21.4C12.6407 21.4 15.3296 20.2 17.1749 18.1087C19.0099 16.029 19.95 13.138 19.95 9.84998H18.45ZM9.3 19.9C7.64458 19.9 6.5374 19.4724 5.70459 18.8831C4.84887 18.2776 4.23772 17.473 3.60565 16.6076L2.39435 17.4923C3.01928 18.348 3.75813 19.3433 4.83816 20.1076C5.9411 20.888 7.35542 21.4 9.3 21.4V19.9ZM3.12743 17.7891C3.15119 17.785 3.16958 17.7806 3.17593 17.7791C3.18458 17.777 3.19158 17.7751 3.19578 17.774C3.20418 17.7717 3.21102 17.7698 3.21457 17.7687C3.22212 17.7665 3.229 17.7644 3.23345 17.763C3.24301 17.76 3.25419 17.7564 3.26552 17.7528C3.28875 17.7453 3.32054 17.7349 3.35881 17.7223C3.43573 17.697 3.54331 17.6613 3.67073 17.6189C3.92579 17.5341 4.26283 17.4216 4.5986 17.3094C4.93446 17.1972 5.26937 17.0851 5.5203 17.0011C5.64577 16.9591 5.75026 16.9241 5.82338 16.8996C5.85994 16.8874 5.88866 16.8777 5.90825 16.8712C5.91804 16.8679 5.92555 16.8654 5.93061 16.8637C5.93314 16.8628 5.93506 16.8622 5.93634 16.8618C5.93699 16.8616 5.93747 16.8614 5.9378 16.8613C5.93796 16.8612 5.93808 16.8612 5.93816 16.8612C5.93821 16.8611 5.93824 16.8611 5.93826 16.8611C5.93828 16.8611 5.93829 16.8611 5.7 16.15C5.46171 15.4388 5.4617 15.4388 5.46168 15.4388C5.46166 15.4389 5.46163 15.4389 5.46159 15.4389C5.46151 15.4389 5.46139 15.4389 5.46123 15.439C5.46091 15.4391 5.46042 15.4393 5.45978 15.4395C5.4585 15.4399 5.45659 15.4406 5.45407 15.4414C5.44902 15.4431 5.44152 15.4456 5.43175 15.4489C5.41219 15.4554 5.3835 15.465 5.34697 15.4773C5.2739 15.5017 5.16949 15.5367 5.0441 15.5787C4.79331 15.6627 4.45867 15.7746 4.12315 15.8868C3.78755 15.9989 3.4514 16.1111 3.19749 16.1955C3.07042 16.2378 2.96458 16.2729 2.88987 16.2975C2.85233 16.3098 2.82377 16.3192 2.80469 16.3253C2.79486 16.3285 2.78939 16.3302 2.78715 16.3309C2.78569 16.3314 2.78787 16.3307 2.79198 16.3295C2.79381 16.3289 2.79923 16.3274 2.80654 16.3254C2.8102 16.3244 2.81673 16.3227 2.82499 16.3207C2.83095 16.3193 2.84904 16.3149 2.87257 16.3109L3.12743 17.7891ZM6.23322 15.6225C3.48941 12.8486 3.28417 8.75557 5.40982 5.78658L4.19018 4.91337C1.64783 8.46438 1.89859 13.3733 5.16678 16.6774L6.23322 15.6225ZM4.13942 5.70513C5.31949 7.90005 7.53919 9.97513 10.0229 10.5788L10.3771 9.12119C8.40881 8.64282 6.49451 6.9179 5.46058 4.99482L4.13942 5.70513ZM10.9496 9.87477C10.9872 8.73878 11.388 7.79965 12.0242 7.14954C12.6563 6.50352 13.5621 6.09998 14.7 6.09998V4.59998C13.1869 4.59998 11.8857 5.14643 10.9521 6.10041C10.0225 7.0503 9.49883 8.36117 9.45041 9.82518L10.9496 9.87477ZM14.7 6.09998C15.5057 6.09998 16.0959 6.25288 16.5489 6.49465C17.0003 6.73555 17.3617 7.08933 17.6738 7.56275L18.9262 6.7372C18.5053 6.09862 17.9692 5.55241 17.2551 5.17131C16.5426 4.79107 15.6993 4.59998 14.7 4.59998V6.09998ZM18.3 7.89998H21V6.39998H18.3V7.89998ZM20.376 6.73395L18.576 9.43395L19.824 10.266L21.624 7.566L20.376 6.73395Z"
                    fill="currentColor"
                  />
                </svg>
              </ListExternalLink>
            </ListItem>
            <ListItem>
              <ListExternalLink target="_blank" href="http://google.come" className="block text-white hover:text-cyan-300">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.496 3.5H16.505C18.987 3.5 21 5.512 21 7.996V17.005C21 19.487 18.988 21.5 16.504 21.5H7.496C5.013 21.5 3 19.488 3 17.004V7.996C3 5.513 5.012 3.5 7.496 3.5V3.5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.949 7.21304C16.763 7.21404 16.612 7.36504 16.612 7.55104C16.612 7.73704 16.764 7.88804 16.95 7.88804C17.136 7.88804 17.287 7.73704 17.287 7.55104C17.288 7.36404 17.136 7.21304 16.949 7.21304"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5455 9.95444C15.9514 11.3603 15.9514 13.6397 14.5455 15.0456C13.1396 16.4515 10.8602 16.4515 9.45432 15.0456C8.04843 13.6397 8.04843 11.3603 9.45432 9.95444C10.8602 8.54855 13.1396 8.54855 14.5455 9.95444"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </ListExternalLink>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  )
}

export default ListComponentDemo
